export function formatLastTransaction(
  date: Date,
  type: "positive" | "negative" | "total"
): string {
  const day = date.getDate();
  const month = Intl.DateTimeFormat("pt-BR", { month: "long" }).format(date);

  if (type === "total") {
    return `01 à ${day} de ${month}`;
  }

  const formattedType = type === "positive" ? "entrada" : "saída";

  return `Última ${formattedType} dia ${day} de ${month}`;
}
