import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react"

export interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  deadline: string
  description: string
  requirements: string[]
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="group flex flex-col transition-all duration-300 hover:shadow-lg hover:border-accent">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{job.department}</p>
          </div>
          <Badge variant="secondary" className="shrink-0 bg-accent/20 text-accent-foreground">
            {job.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>Até {job.deadline}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5" />
            <span>{job.requirements.length} requisitos</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/vaga/${job.id}`} className="w-full">
          <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Candidatar-se
            <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </CardFooter>
    </Card>
  )
}
