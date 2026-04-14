import { Job } from "@/components/job-card"

export const jobs: Job[] = [
  {
    id: "1",
    title: "Analista Administrativo",
    department: "Secretaria de Administração",
    location: "Centro Administrativo",
    type: "Tempo Integral",
    deadline: "15/04/2026",
    description: "Responsável por análise e elaboração de relatórios administrativos, controle de processos e suporte às atividades da secretaria.",
    requirements: [
      "Ensino Superior completo em Administração ou áreas afins",
      "Experiência mínima de 2 anos na área administrativa",
      "Conhecimento em pacote Office avançado",
      "Boa comunicação escrita e verbal"
    ]
  },
  {
    id: "2",
    title: "Enfermeiro(a)",
    department: "Secretaria de Saúde",
    location: "UBS Central",
    type: "Tempo Integral",
    deadline: "20/04/2026",
    description: "Atuação em unidade básica de saúde, prestando assistência de enfermagem à comunidade e participando de programas de saúde pública.",
    requirements: [
      "Graduação em Enfermagem",
      "Registro ativo no COREN",
      "Experiência em atenção básica",
      "Disponibilidade para trabalho em equipe"
    ]
  },
  {
    id: "3",
    title: "Professor(a) de Ensino Fundamental",
    department: "Secretaria de Educação",
    location: "Escolas Municipais",
    type: "Tempo Integral",
    deadline: "25/04/2026",
    description: "Ministrar aulas para alunos do ensino fundamental, elaborar planos de aula e participar de atividades pedagógicas.",
    requirements: [
      "Licenciatura em Pedagogia ou área específica",
      "Experiência em sala de aula",
      "Conhecimento em metodologias ativas",
      "Capacidade de trabalho interdisciplinar"
    ]
  },
  {
    id: "4",
    title: "Técnico em Informática",
    department: "Secretaria de Tecnologia",
    location: "Centro Administrativo",
    type: "Tempo Integral",
    deadline: "30/04/2026",
    description: "Suporte técnico em hardware e software, manutenção de equipamentos e auxílio aos usuários dos sistemas municipais.",
    requirements: [
      "Curso técnico em Informática ou áreas correlatas",
      "Conhecimento em redes de computadores",
      "Experiência em suporte técnico",
      "Proatividade e capacidade de resolução de problemas"
    ]
  },
  {
    id: "5",
    title: "Assistente Social",
    department: "Secretaria de Assistência Social",
    location: "CRAS Municipal",
    type: "Tempo Integral",
    deadline: "10/04/2026",
    description: "Atendimento à população em situação de vulnerabilidade, elaboração de relatórios sociais e participação em programas sociais.",
    requirements: [
      "Graduação em Serviço Social",
      "Registro ativo no CRESS",
      "Experiência em políticas públicas",
      "Habilidade em atendimento humanizado"
    ]
  },
  {
    id: "6",
    title: "Engenheiro Civil",
    department: "Secretaria de Obras",
    location: "Centro Administrativo",
    type: "Tempo Integral",
    deadline: "05/05/2026",
    description: "Elaboração e fiscalização de projetos de obras públicas, análise de processos de construção e emissão de laudos técnicos.",
    requirements: [
      "Graduação em Engenharia Civil",
      "Registro ativo no CREA",
      "Experiência em obras públicas",
      "Conhecimento em AutoCAD e software de projetos"
    ]
  }
]
