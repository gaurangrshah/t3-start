import { PrismaClient } from '@prisma/client';

import { createSession } from '../src/lib/next-auth/session-utils';
import { createTestUser } from './factory';

const prisma = new PrismaClient();

async function main() {
  const user1 = createTestUser({});
  await createSession(
    await prisma.user.upsert({
      where: { email: user1.email },
      update: {},
      create: { ...user1 },
    })
  );
  console.log('seeded');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/**
 * * SEE: https://www.prisma.io/docs/guides/database/seed-database
 */
