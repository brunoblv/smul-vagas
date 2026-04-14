"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Plus, Trash2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { criarVaga } from "@/app/actions/vagas"

const RESPONSAVEIS = [
  "Ana Paula Ferreira",
  "Carlos Eduardo Santos",
  "Mariana Costa Lima",
  "Roberto Alves Mendes",
  "Fernanda Oliveira Nunes",
]

const etapaSchema = z.object({
  titulo: z.string().min(1, "Título da etapa é obrigatório"),
})

const formSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  departamento: z.string().min(1, "Departamento é obrigatório"),
  descricaoAtividades: z.string().min(1, "Descrição das atividades é obrigatória"),
  habilidadesDesejaveis: z.string().optional(),
  curso: z.string().min(1, "Curso é obrigatório"),
  cargaHoraria: z.enum(["20", "30"], {
    required_error: "Selecione a carga horária",
  }),
  bolsaAuxilio: z.string().min(1, "Bolsa-auxílio é obrigatória"),
  valeTransporte: z.string().min(1, "Vale-transporte é obrigatório"),
  prazoInscricoes: z.date({ required_error: "Prazo de inscrições é obrigatório" }),
  numeroVagas: z.coerce
    .number({ invalid_type_error: "Informe o número de vagas" })
    .min(1, "Mínimo 1 vaga"),
  etapas: z
    .array(etapaSchema)
    .min(1, "Adicione pelo menos uma etapa do processo seletivo"),
  responsavel: z.string().min(1, "Responsável é obrigatório"),
})

type FormValues = z.infer<typeof formSchema>

function formatCurrencyInput(value: string): string {
  const digits = value.replace(/\D/g, "")
  if (!digits) return ""
  const amount = parseInt(digits, 10) / 100
  return amount.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function parseCurrencyToNumber(formatted: string): number {
  return parseFloat(formatted.replace(/\./g, "").replace(",", ".")) || 0
}

export function VagaForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      departamento: "",
      descricaoAtividades: "",
      habilidadesDesejaveis: "",
      curso: "",
      bolsaAuxilio: "",
      valeTransporte: "",
      etapas: [{ titulo: "" }],
      responsavel: "",
    } as Partial<FormValues>,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "etapas",
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    try {
      const result = await criarVaga({
        titulo: values.titulo,
        departamento: values.departamento,
        descricaoAtividades: values.descricaoAtividades,
        habilidadesDesejaveis: values.habilidadesDesejaveis || undefined,
        curso: values.curso,
        cargaHoraria: parseInt(values.cargaHoraria),
        bolsaAuxilio: parseCurrencyToNumber(values.bolsaAuxilio),
        valeTransporte: parseCurrencyToNumber(values.valeTransporte),
        prazoInscricoes: values.prazoInscricoes,
        numeroVagas: values.numeroVagas,
        responsavel: values.responsavel,
        etapas: values.etapas.map((e, i) => ({ titulo: e.titulo, ordem: i + 1 })),
      })

      if (result.success) {
        toast.success("Vaga cadastrada com sucesso!")
        router.push("/vagas")
      } else {
        toast.error(result.error || "Erro ao cadastrar vaga")
      }
    } catch {
      toast.error("Erro inesperado. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const ETAPA_PLACEHOLDERS = [
    "Ex: Triagem de currículos",
    "Ex: Entrevista com RH",
    "Ex: Teste técnico",
    "Ex: Entrevista com a área",
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Seção 1 — Informações básicas */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
              Seção 1
            </h2>
            <p className="text-base font-semibold text-foreground mt-0.5">
              Informações básicas
            </p>
          </div>
          <Separator />

          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título da vaga</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Estagiário em Gestão Urbana"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="departamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Área / Departamento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Departamento de Licenciamento de Obras"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">Modalidade</span>
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/10 text-primary hover:bg-primary/10"
            >
              Presencial
            </Badge>
          </div>
        </div>

        {/* Seção 2 — Detalhes da vaga */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
              Seção 2
            </h2>
            <p className="text-base font-semibold text-foreground mt-0.5">
              Detalhes da vaga
            </p>
          </div>
          <Separator />

          <FormField
            control={form.control}
            name="descricaoAtividades"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição das atividades</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva as principais atividades que o estagiário irá desenvolver..."
                    className="min-h-30 resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="habilidadesDesejaveis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  O que buscamos{" "}
                  <span className="font-normal text-muted-foreground">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Perfil ideal do candidato, conhecimentos ou experiências que seriam um diferencial..."
                    className="min-h-25 resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="curso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curso</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Arquitetura e Urbanismo, Direito, Administração..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-3 rounded-md border border-border bg-muted/40 px-4 py-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
            <span className="text-sm text-foreground">
              Candidatos do <strong>1º ao penúltimo semestre</strong> do curso
            </span>
          </div>
        </div>

        {/* Seção 3 — Condições da vaga */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
              Seção 3
            </h2>
            <p className="text-base font-semibold text-foreground mt-0.5">
              Condições da vaga
            </p>
          </div>
          <Separator />

          <div className="grid gap-5 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="cargaHoraria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carga horária semanal</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="20">20 horas</SelectItem>
                      <SelectItem value="30">30 horas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bolsaAuxilio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bolsa-auxílio (R$)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0,00"
                      inputMode="numeric"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(formatCurrencyInput(e.target.value))
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="valeTransporte"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vale-transporte (R$)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0,00"
                      inputMode="numeric"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(formatCurrencyInput(e.target.value))
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-3 rounded-md border border-border bg-muted/40 px-4 py-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
            <span className="text-sm text-foreground">Seguro de vida incluso</span>
          </div>
        </div>

        {/* Seção 4 — Processo seletivo */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
              Seção 4
            </h2>
            <p className="text-base font-semibold text-foreground mt-0.5">
              Processo seletivo
            </p>
          </div>
          <Separator />

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="prazoInscricoes"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Prazo de inscrições</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "dd 'de' MMMM 'de' yyyy", {
                                locale: ptBR,
                              })
                            : "Selecione uma data"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        locale={ptBR}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numeroVagas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de vagas</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} placeholder="Ex: 2" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Etapas do processo seletivo */}
          <FormField
            control={form.control}
            name="etapas"
            render={() => (
              <FormItem>
                <FormLabel>Etapas do processo seletivo</FormLabel>
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-3">
                      <span className="mt-2.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {index + 1}
                      </span>
                      <FormField
                        control={form.control}
                        name={`etapas.${index}.titulo`}
                        render={({ field: etapaField }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder={
                                  ETAPA_PLACEHOLDERS[index] ?? "Nome da etapa"
                                }
                                {...etapaField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="mt-0.5 text-muted-foreground hover:text-destructive"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-1"
                    onClick={() => append({ titulo: "" })}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar etapa
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="responsavel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsável interno</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {RESPONSAVEIS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Ações */}
        <div className="flex justify-end gap-3 pb-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/vagas")}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Cadastrar vaga"}
          </Button>
        </div>
      </form>
    </Form>
  )
}