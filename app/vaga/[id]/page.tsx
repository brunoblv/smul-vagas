import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ApplicationForm } from "@/components/application-form"
import { jobs } from "@/lib/jobs-data"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Briefcase, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function JobPage({ params }: PageProps) {
  const { id } = await params
  const job = jobs.find((j) => j.id === id)

  if (!job) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Job Header */}
        <section className="border-b border-border bg-card py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <Link
              href="/#vagas"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar às vagas
            </Link>

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                    {job.title}
                  </h1>
                  <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                    {job.type}
                  </Badge>
                </div>
                <p className="mt-2 text-lg text-muted-foreground">{job.department}</p>

                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Inscrições até {job.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span>{job.requirements.length} requisitos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-3">
              {/* Job Details */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-card-foreground">
                      Descrição da Vaga
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-card-foreground">
                      Requisitos
                    </h2>
                    <ul className="mt-3 space-y-3">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-border bg-card p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Formulário de Candidatura
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Preencha os campos abaixo para se candidatar a esta vaga.
                  </p>
                  <ApplicationForm jobTitle={job.title} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
