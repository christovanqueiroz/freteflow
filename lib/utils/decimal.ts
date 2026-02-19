export const toNumber = (value: string | number): number => {
  return typeof value === "number" ? value : Number.parseFloat(value);
};

export const currency = (value: number): string =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
