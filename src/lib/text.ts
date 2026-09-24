/** Remove acentos e padroniza caixa, para buscas tolerantes ("missa" encontra "Missa", "fe" encontra "fé"). */
export function normalizeText(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}
