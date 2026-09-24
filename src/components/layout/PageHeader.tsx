import type { ReactNode } from 'react'
import { LightRays } from '@/components/ui/LightRays'
import { Rosette } from '@/components/ui/Rosette'
import { StainedGlassWindow } from '@/components/ui/StainedGlassWindow'

type PageHeaderProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  /** Semente do vitral: cada página tem o seu desenho. */
  glassSeed?: number
  children?: ReactNode
}

/** Topo padrão das páginas internas: texto à esquerda, vitral à direita. */
export function PageHeader({ eyebrow, title, description, glassSeed = 3, children }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-surface">
      <LightRays />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 sm:py-20 md:grid-cols-[1fr_auto] lg:px-10">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-primary-strong uppercase">
            <Rosette className="size-4 text-primary" />
            {eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-5xl font-medium tracking-tight text-balance text-ink sm:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-muted">{description}</p>
          )}
          {children}
        </div>

        <StainedGlassWindow
          seed={glassSeed}
          className="hidden w-44 drop-shadow-[0_20px_40px_rgb(74_107_148/0.25)] md:block lg:w-52"
        />
      </div>
    </section>
  )
}
