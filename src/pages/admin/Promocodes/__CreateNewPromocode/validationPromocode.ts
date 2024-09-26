export const validateCode = (code: string): string | null =>
  code.length > 30 ? "Длина должна быть менее 30 символов" : null;

export const validateAmount = (amount: number): string | null =>
  amount < 1 || amount > 99 ? "Некорректный процент промокода" : null;
