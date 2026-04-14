import { Building2, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
                <Building2 className="h-6 w-6 text-sidebar-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold leading-tight">
                  Prefeitura Municipal
                </span>
                <span className="text-xs text-sidebar-foreground/70">
                  Portal de Vagas
                </span>
              </div>
            </div>
            <p className="text-sm text-sidebar-foreground/70">
              Oportunidades de emprego para cidadãos que desejam contribuir com o desenvolvimento da nossa cidade.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Links Úteis</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-sidebar-foreground/70 transition-colors hover:text-sidebar-foreground">
                Início
              </Link>
              <Link href="/#vagas" className="text-sm text-sidebar-foreground/70 transition-colors hover:text-sidebar-foreground">
                Vagas Abertas
              </Link>
              <Link href="/#sobre" className="text-sm text-sidebar-foreground/70 transition-colors hover:text-sidebar-foreground">
                Sobre o Portal
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Contato</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
                <MapPin className="h-4 w-4" />
                <span>Praça Central, 100 - Centro</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
                <Phone className="h-4 w-4" />
                <span>(00) 0000-0000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
                <Mail className="h-4 w-4" />
                <span>vagas@prefeitura.gov.br</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-sidebar-border pt-6">
          <p className="text-center text-sm text-sidebar-foreground/50">
            © {new Date().getFullYear()} Prefeitura Municipal. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
