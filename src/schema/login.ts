import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(5, { message: "A senha deve ter pelo menos 8 caracteres" }),
});

export type Login = z.infer<typeof loginSchema>;