"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Loader2, Plus, X } from "lucide-react"

interface ApplicationFormProps {
  jobTitle: string
}

const commonSkills = [
  "Microsoft Office",
  "Comunicação",
  "Trabalho em Equipe",
  "Organização",
  "Liderança",
  "Gestão de Tempo",
  "Resolução de Problemas",
  "Atendimento ao Público",
]

export function ApplicationForm({ jobTitle }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [customSkill, setCustomSkill] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    )
  }

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills((prev) => [...prev, customSkill.trim()])
      setCustomSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill))
  }

  if (isSubmitted) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-card-foreground">
          Candidatura Enviada!
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Sua candidatura para a vaga de <strong>{jobTitle}</strong> foi recebida com sucesso. Entraremos em contato em breve pelo e-mail informado.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="mt-6"
        >
          Enviar Nova Candidatura
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-8">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="font-medium text-card-foreground">Dados Pessoais</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Digite seu nome completo"
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF *</Label>
            <Input
              id="cpf"
              name="cpf"
              placeholder="000.000.000-00"
              required
              className="bg-background"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              required
              className="bg-background"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <h3 className="font-medium text-card-foreground">Endereço</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Endereço *</Label>
            <Input
              id="address"
              name="address"
              placeholder="Rua, número, bairro"
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Cidade *</Label>
            <Input
              id="city"
              name="city"
              placeholder="Sua cidade"
              required
              className="bg-background"
            />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h3 className="font-medium text-card-foreground">Formação Acadêmica</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="education">Escolaridade *</Label>
            <select
              id="education"
              name="education"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Selecione</option>
              <option value="fundamental">Ensino Fundamental</option>
              <option value="medio">Ensino Médio</option>
              <option value="tecnico">Ensino Técnico</option>
              <option value="superior">Ensino Superior</option>
              <option value="pos">Pós-Graduação</option>
              <option value="mestrado">Mestrado</option>
              <option value="doutorado">Doutorado</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Curso / Área de Formação</Label>
            <Input
              id="course"
              name="course"
              placeholder="Ex: Administração, Enfermagem..."
              className="bg-background"
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="font-medium text-card-foreground">Habilidades e Competências</h3>
        <p className="text-sm text-muted-foreground">
          Selecione as habilidades que você possui ou adicione outras.
        </p>

        {/* Common Skills */}
        <div className="flex flex-wrap gap-2">
          {commonSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm transition-colors ${
                selectedSkills.includes(skill)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Add Custom Skill */}
        <div className="flex gap-2">
          <Input
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            placeholder="Adicionar outra habilidade"
            className="bg-background"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addCustomSkill()
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={addCustomSkill}
            className="shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Selected Skills */}
        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="gap-1 bg-accent/20 text-accent-foreground"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 rounded-full hover:bg-accent/30"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <h3 className="font-medium text-card-foreground">Experiência Profissional</h3>
        <div className="space-y-2">
          <Label htmlFor="experience">Descreva suas experiências anteriores</Label>
          <Textarea
            id="experience"
            name="experience"
            placeholder="Descreva brevemente suas experiências profissionais anteriores, incluindo cargo, empresa e período..."
            rows={4}
            className="bg-background resize-none"
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-4">
        <h3 className="font-medium text-card-foreground">Informações Adicionais</h3>
        <div className="space-y-2">
          <Label htmlFor="motivation">Por que você deseja trabalhar conosco?</Label>
          <Textarea
            id="motivation"
            name="motivation"
            placeholder="Conte-nos o que te motiva a se candidatar a esta vaga..."
            rows={3}
            className="bg-background resize-none"
          />
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          required
          className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-ring"
        />
        <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal cursor-pointer">
          Declaro que as informações fornecidas são verdadeiras e autorizo o uso dos meus dados para fins de seleção. *
        </Label>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar Candidatura"
        )}
      </Button>
    </form>
  )
}
