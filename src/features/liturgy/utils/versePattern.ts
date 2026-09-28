// Números de versículo vêm colados ao texto (ex.: "7o tetrarca", "12E Deus").
// Sufixo de meio-versículo ("9aChegados") só conta se seguido de maiúscula,
// para não confundir com a primeira letra da palavra ("10não").
export const VERSE_PATTERN = /(^|\s)(\d+(?:[a-z](?=[A-ZÀ-Ý“"‘]))?)(?=[^\s\d,.;:)])/g
