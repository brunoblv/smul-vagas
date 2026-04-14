"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type ActionResult = { success: true } | { success: false; error: string }

export async function criarVaga(data: {
  titulo: string
  departamento: string
  descricaoAtividades: string
  habilidadesDesejaveis?: string
  curso: string
  cargaHoraria: number
  bolsaAuxilio: number
  valeTransporte: number
  prazoInscricoes: Date
  numeroVagas: number
  responsavel: string
  etapas: { titulo: string; ordem: number }[]
}): Promise<ActionResult> {
  try {
    await prisma.vaga.create({
      data: {
        titulo: data.titulo,
        departamento: data.departamento,
        modalidade: "Presencial",
        descricaoAtividades: data.descricaoAtividades,
        habilidadesDesejaveis: data.habilidadesDesejaveis ?? null,
        curso: data.curso,
        cargaHoraria: data.cargaHoraria,
        bolsaAuxilio: data.bolsaAuxilio,
        valeTransporte: data.valeTransporte,
        prazoInscricoes: data.prazoInscricoes,
        numeroVagas: data.numeroVagas,
        responsavel: data.responsavel,
        etapas: {
          create: data.etapas,
        },
      },
    })

    revalidatePath("/vagas")
    return { success: true }
  } catch (error) {
    console.error("Erro ao criar vaga:", error)
    return { success: false, error: "Erro ao salvar vaga no banco de dados." }
  }
}