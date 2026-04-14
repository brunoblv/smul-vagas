import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Plus, Calendar, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const dynamic = "force-dynamic"

export default async function VagasPage() {
  const vagas = await prisma.vaga.findMany({
    orderBy: { criadoEm: "desc" },
  })

  return (
    <main className="flex-1 bg-muted/30">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Vagas cadastradas</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {vagas.length === 0
                ? "Nenhuma vaga cadastrada ainda"
                : `${vagas.length} ${vagas.length === 1 ? "vaga" : "vagas"} no sistema`}
            </p>
          </div>
        </div>

        {vagas.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              Nenhuma vaga cadastrada
            </h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Comece cadastrando a primeira vaga de estágio da secretaria.
            </p>
            <Link href="/vagas/nova" className="mt-6">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Cadastrar primeira vaga
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {vagas.map((vaga) => {
              const isEncerrada =
                vaga.status === "encerrada" ||
                new Date(vaga.prazoInscricoes) < new Date()

              return (
                <div
                  key={vaga.id}
                  className="flex flex-col rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-foreground">
                        {vaga.titulo}
                      </h3>
                      <p className="mt-0.5 truncate text-sm text-muted-foreground">
                        {vaga.departamento}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        isEncerrada
                          ? "shrink-0 border-border bg-muted text-muted-foreground"
                          : "shrink-0 border-primary/30 bg-primary/10 text-primary"
                      }
                    >
                      {isEncerrada ? "Encerrada" : "Ativa"}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span>
                        Inscrições até{" "}
                        {format(new Date(vaga.prazoInscricoes), "dd/MM/yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 shrink-0" />
                      <span>
                        {vaga.numeroVagas}{" "}
                        {vaga.numeroVagas === 1 ? "vaga" : "vagas"} •{" "}
                        {vaga.curso}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 shrink-0" />
                      <span>
                        A partir do {vaga.semestreMinimo}º semestre •{" "}
                        {vaga.cargaHoraria}h semanais
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                    Responsável: {vaga.responsavel}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}