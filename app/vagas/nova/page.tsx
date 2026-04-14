import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { VagaForm } from "@/components/vaga-form"

export default function NovaVagaPage() {
  return (
    <main className="flex-1 bg-muted/30">
      <div className="container mx-auto max-w-3xl px-4 py-8 md:px-6">
        <Link
          href="/vagas"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar às vagas
        </Link>

        <div className="mb-8">
          <h1 className="text-xl font-bold text-foreground">Cadastrar nova vaga</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Preencha todos os campos obrigatórios para publicar a vaga de estágio.
          </p>
        </div>

        <VagaForm />
      </div>
    </main>
  )
}