import { ZodSchema } from 'zod';

export * from './auth.schema';
export * from './prisma.schema';

export function zParse(schema: ZodSchema, data: Record<string, any>) {
  const result = schema.safeParse(data);
  if (result.success) return true;
  console.error(`🔴 ${JSON.parse(result.error.message)[0].message}`);
  return false;
}
