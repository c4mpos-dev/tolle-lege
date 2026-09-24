import { useId, useMemo, useState } from 'react'
import type { Liturgy, Psalm, Reading } from '../types'
import { ReadingView } from './ReadingView'

type Tab =
  | { label: string; kind: 'reading'; options: Reading[] }
  | { label: string; kind: 'psalm'; options: Psalm[] }

function buildTabs({ leituras }: Liturgy): Tab[] {
  const tabs: Tab[] = [
    { label: '1ª Leitura', kind: 'reading', options: leituras.primeiraLeitura },
    { label: 'Salmo', kind: 'psalm', options: leituras.salmo },
    { label: '2ª Leitura', kind: 'reading', options: leituras.segundaLeitura },
    // Leituras adicionais, como as da Vigília Pascal
    ...leituras.extras.map(
      (extra): Tab => ({ label: extra.tipo ?? extra.titulo, kind: 'reading', options: [extra] }),
    ),
    { label: 'Evangelho', kind: 'reading', options: leituras.evangelho },
  ]

  return tabs.filter((tab) => tab.options.length > 0)
}

export function ReadingsTabs({ liturgy }: { liturgy: Liturgy }) {
  const tabs = useMemo(() => buildTabs(liturgy), [liturgy])
  const [active, setActive] = useState(0)
  const baseId = useId()
  const current = tabs[active]

  if (!current) return null

  return (
    <div>
      <div
        role="tablist"
        aria-label="Leituras do dia"
        className="flex gap-1 overflow-x-auto border-b border-line"
      >
        {tabs.map((tab, index) => (
          <button
            key={`${tab.label}-${index}`}
            id={`${baseId}-tab-${index}`}
            role="tab"
            type="button"
            aria-selected={index === active}
            aria-controls={`${baseId}-panel`}
            onClick={() => setActive(index)}
            className="-mb-px shrink-0 border-b-2 border-transparent px-4 py-3 text-sm font-medium whitespace-nowrap text-ink-muted transition-colors hover:text-ink aria-selected:border-primary aria-selected:text-ink"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="pt-8"
      >
        {/* key reinicia a opção selecionada ao trocar de aba */}
        {current.kind === 'psalm' ? (
          <ReadingView key={active} kind="psalm" options={current.options} />
        ) : (
          <ReadingView key={active} kind="reading" options={current.options} />
        )}
      </div>
    </div>
  )
}
