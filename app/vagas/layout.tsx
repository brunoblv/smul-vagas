import Link from "next/link"
import { Building2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VagasLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/vagas" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-tight text-foreground">
                Secretaria de Urbanismo e Licenciamento
              </span>
              <span className="text-xs text-muted-foreground">Gestão de Vagas de Estágio</span>
            </div>
          </Link>
          <Link href="/vagas/nova">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nova vaga
            </Button>
          </Link>
        </div>
      </header>
      {children}
    </div>
  )
}