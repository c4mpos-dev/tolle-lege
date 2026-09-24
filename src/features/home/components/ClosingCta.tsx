import { ButtonLink } from '@/components/ui/ButtonLink'
import { Reveal } from '@/components/ui/Reveal'
import { StainedGlassWindow } from '@/components/ui/StainedGlassWindow'
import { routes } from '@/config/routes'

export function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:py-28 md:grid-cols-[auto_1fr] lg:px-10">
        <Reveal className="mx-auto w-40 sm:w-52 md:mx-0">
          <StainedGlassWindow
            seed={2}
            className="w-full drop-shadow-[0_24px_48px_rgb(74_107_148/0.3)]"
          />
        </Reveal>

        <Reveal delay={0.15} className="max-w-xl text-center md:text-left">
          <h2 className="font-serif text-4xl font-medium tracking-tight text-balance text-ink sm:text-5xl">
            O próximo passo é seu
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Nenhum site substitui uma comunidade. Quando se sentir pronto, visite uma paróquia perto
            de você: a porta está aberta.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 md:justify-start">
            <ButtonLink to={routes.trails}>Escolher minha trilha</ButtonLink>
            <ButtonLink to={routes.faq} variant="text">
              Tirar uma dúvida
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
