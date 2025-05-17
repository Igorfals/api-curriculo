import { z } from "zod";

export const userSchemaData = z.object({
    id: z.number().optional(),
    name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    status_user: z.number().int().min(0, { message: "Status deve ser um número inteiro não negativo" }).default(1),
}).strict();

export const userSchemaCreate = userSchemaData.omit({ id: true });

export const userSchemaID = userSchemaData.extend({
    id: z.number().int().positive({ message: "ID deve ser um número inteiro positivo" })
}).strict();

export type UserData = z.infer<typeof userSchemaData>;
export type UserCreate = z.infer<typeof userSchemaCreate>;
export type UserID = z.infer<typeof userSchemaID>;
