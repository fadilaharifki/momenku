import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ElegantGoldTemplate } from "@/components/templates/elegant-gold"
import { RusticGardenTemplate } from "@/components/templates/rustic-garden"
import { ModernLuxuryTemplate } from "@/components/templates/modern-luxury"

const templateData: Record<
  string,
  {
    name: string
    description: string
    component: React.ComponentType
  }
> = {
  "elegant-gold": {
    name: "Elegant Gold",
    description: "Template undangan digital pernikahan Elegant Gold - Desain klasik dengan sentuhan emas yang mewah.",
    component: ElegantGoldTemplate,
  },
  "rustic-garden": {
    name: "Rustic Garden",
    description: "Template undangan digital pernikahan Rustic Garden - Nuansa bohemian dengan aksen botanical.",
    component: RusticGardenTemplate,
  },
  "modern-luxury": {
    name: "Modern Luxury",
    description: "Template undangan digital pernikahan Modern Luxury - Desain modern minimalis dengan aksen hitam dan emas.",
    component: ModernLuxuryTemplate,
  },
}

export async function generateStaticParams() {
  return Object.keys(templateData).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const template = templateData[slug]
  if (!template) return { title: "Template Tidak Ditemukan" }
  return {
    title: `${template.name} - Template Undangan Digital | MomenKu`,
    description: template.description,
  }
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const template = templateData[slug]
  if (!template) notFound()
  const TemplateComponent = template.component
  return <TemplateComponent />
}
