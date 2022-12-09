import { errorMessages, typeErrorMessage } from '@/utils';
import { z } from 'zod';

// NOTE: all inferred ts types can be found at: "@/types/zod/prisma.ts"

export const accountSchema = z.object({
  id: z.string(errorMessages('id', 'string')),
  userid: z.string(errorMessages('userId', 'string')),
  type: z.string(errorMessages('type', 'string')),
  provider: z.string(errorMessages('provider', 'string')),
  providerAccountId: z.string(errorMessages('providerAccountId', 'string')),
  refresh_token: z.optional(z.string(errorMessages('refresh_token', 'string'))),
  access_token: z.optional(z.string(errorMessages('access_token', 'string'))),
  expires_at: z.optional(z.string(errorMessages('expires_at', 'number'))),
  token_type: z.optional(z.string(errorMessages('token_type', 'string'))),
  scope: z.optional(z.string(errorMessages('scope', 'string'))),
  id_token: z.optional(z.string(errorMessages('id_token', 'string'))),
  session_state: z.optional(z.string(errorMessages('session_state', 'string'))),
});

export const sessionSchema = z.object({
  id: z.string(errorMessages('id', 'string')),
  sessionToken: z.string(errorMessages('sessionToken', 'string')),
  userid: z.string(errorMessages('userId', 'string')),
  expires: z.string(errorMessages('expires', 'date')),
});

export const verificationTokenSchema = z.object({
  identifier: z.string(errorMessages('id', 'string')),
  token: z.string(errorMessages('token', 'string')),
  expires: z.string(errorMessages('expires', 'date')),
});

export const prismaUserSchema = z.object({
  id: z.string(errorMessages('id', 'string')),
  name: z.string(typeErrorMessage('name', 'string')).nullable(),
  email: z.string(typeErrorMessage('email', 'string')).nullable(),
  emailVerified: z.optional(
    z.date(typeErrorMessage('emailVerified', 'date')).nullable()
  ),
  image: z.string(typeErrorMessage('image', 'string')).nullable(),
  session: z.optional(z.array(sessionSchema)),
  account: z.optional(z.array(accountSchema)),
});

export const prismaUserWithPasswordSchema = prismaUserSchema.merge(
  z.object({
    password: z.string(typeErrorMessage('password', 'string')).nullable(),
  })
);
