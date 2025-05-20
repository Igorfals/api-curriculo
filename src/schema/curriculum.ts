import { z } from "zod";

export const curriculumSchemaData = z.object({
    id: z.number().optional(),
    user_id: z.number().optional(),
    json_data: z.any()
}).strict();

export const curriculumSchemaCreate = curriculumSchemaData.omit({ id: true });

export const curriculumSchemaID = curriculumSchemaData.extend({
    id: z.number().int().positive({ message: "ID deve ser um número inteiro positivo" })
}).strict();

export type CurriculumData = z.infer<typeof curriculumSchemaData>;
export type CurriculumCreate = z.infer<typeof curriculumSchemaCreate>;
export type CurriculumID = z.infer<typeof curriculumSchemaID>;
