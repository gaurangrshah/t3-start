import { PrismaClient } from '@prisma/client';

/**
 * @NOTE: cannot use the @/env vars due to prisma seed
 * ESM import issue. This is why this file defers to process.env
 */
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export async function disconnect() {
  await prisma.$disconnect();

  return true;
}

export async function connect() {
  await prisma.$connect();

  return true;
}
