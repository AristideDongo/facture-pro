export const formatFCFA = (value: number): string => {
  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return formatted
    .replace(/\u202F/g, ' ') // espace fine insécable
    .replace(/\u00A0/g, ' ') // espace insécable classique
    .replace(/,/g, '.')      // si la virgule pose problème
    .replace(/\s+/g, ' ')    // normalise les espaces multiples
    .trim();
};
