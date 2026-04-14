import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Calendar, Users, Clock, BookOpen, ArrowRight, Building2, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const dynamic = "force-dynamic"

export default async function PortalPage() {
  const vagas = await prisma.vaga.findMany({
    where: { status: "ativa" },
    orderBy: { criadoEm: "desc" },
  })

  const vagasAbertas = vagas.filter(
    (v) => new Date(v.prazoInscricoes) >= new Date()
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-tight text-foreground">
                Secretaria de Urbanismo e Licenciamento
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Prefeitura de São Paulo
              </span>
            </div>
          </div>
          <Link href="/vagas">
            <Button variant="outline" size="sm">
              Área administrativa
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border bg-primary px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium text-primary-foreground/80">
            <GraduationCap className="h-3.5 w-3.5" />
            Portal de Estágios
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
            Faça parte da gestão de São Paulo
          </h1>
          <p className="mt-4 text-base text-primary-foreground/70 md:text-lg">
            A Secretaria de Urbanismo e Licenciamento oferece oportunidades de estágio para estudantes que querem
            contribuir com o desenvolvimento urbano da cidade.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-primary-foreground/70">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-primary-foreground">{vagasAbertas.length}</span>
              <span>{vagasAbertas.length === 1 ? "vaga aberta" : "vagas abertas"}</span>
            </div>
            <div className="h-8 w-px bg-primary-foreground/20" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-primary-foreground">
                {vagasAbertas.reduce((sum, v) => sum + v.numeroVagas, 0)}
              </span>
              <span>{vagasAbertas.reduce((sum, v) => sum + v.numeroVagas, 0) === 1 ? "posição disponível" : "posições disponíveis"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vagas */}
      <main className="flex-1 bg-muted/30 px-4 py-10 md:px-6">
        <div className="container mx-auto">
          <h2 className="mb-1 text-lg font-semibold text-foreground">Vagas disponíveis</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Clique em uma vaga para ver os detalhes e se inscrever.
          </p>

          {vagasAbertas.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card py-24 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                Nenhuma vaga disponível no momento
              </h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Volte em breve. Novas oportunidades são publicadas periodicamente.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {vagasAbertas.map((vaga) => {
                const diasRestantes = Math.ceil(
                  (new Date(vaga.prazoInscricoes).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                )
                const urgente = diasRestantes <= 7

                return (
                  <Link key={vaga.id} href={`/vagas/${vaga.id}`} className="group block">
                    <div className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {vaga.titulo}
                          </h3>
                          <p className="mt-0.5 truncate text-sm text-muted-foreground">
                            {vaga.departamento}
                          </p>
                        </div>
                        {urgente && (
                          <Badge className="shrink-0 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                            Encerra em breve
                          </Badge>
                        )}
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>
                            Inscrições até{" "}
                            <span className={urgente ? "font-medium text-amber-600" : ""}>
                              {format(new Date(vaga.prazoInscricoes), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 shrink-0" />
                          <span>
                            {vaga.numeroVagas} {vaga.numeroVagas === 1 ? "vaga" : "vagas"} • {vaga.curso}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 shrink-0" />
                          <span>{vaga.cargaHoraria}h semanais • {vaga.modalidade}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          Responsável: {vaga.responsavel}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          Ver detalhes
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-6 md:px-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>Secretaria de Urbanismo e Licenciamento — SMUL · Prefeitura de São Paulo</span>
          </div>
          <span>Portal de Estágios</span>
        </div>
      </footer>
    </div>
  )
}
