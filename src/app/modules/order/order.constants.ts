export const PAYMENT_STATUS = {
    pending: "pending",
    paid: "paid",
} as const;

export type TPaymentStatus = keyof typeof PAYMENT_STATUS;