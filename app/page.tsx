import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JobCard } from "@/components/job-card"
import { jobs } from "@/lib/jobs-data"
import { Search, Users, FileCheck, Building2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                <span className="text-balance">Construa sua carreira no serviço público</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
                Encontre oportunidades de emprego na Prefeitura Municipal e faça parte da equipe que transforma nossa cidade todos os dias.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a 
                  href="#vagas"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-8 text-base font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  <Search className="h-5 w-5" />
                  Ver Vagas Disponíveis
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Sobre o Portal de Vagas
              </h2>
              <p className="mt-4 text-muted-foreground">
                O Portal de Vagas da Prefeitura Municipal é a plataforma oficial para divulgação de oportunidades de emprego no serviço público municipal. Aqui você encontra informações sobre processos seletivos, requisitos das vagas e pode se candidatar diretamente às posições disponíveis.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20">
                  <Search className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">Encontre Vagas</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Navegue pelas oportunidades disponíveis em diversas secretarias e áreas de atuação.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20">
                  <FileCheck className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">Candidate-se Online</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Preencha o formulário de candidatura de forma rápida e segura, sem sair de casa.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20">
                  <Users className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">Faça Parte da Equipe</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Contribua com o desenvolvimento da nossa cidade e construa uma carreira sólida.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Jobs Section */}
        <section id="vagas" className="bg-muted/50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Vagas Abertas
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Confira as oportunidades disponíveis e encontre a vaga ideal para você.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>{jobs.length} vagas disponíveis</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
