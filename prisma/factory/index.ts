import { PrismaClient } from '@prisma/client';
import { createSession } from '../../src/lib/next-auth/session-utils';
import { addDays, dateToSeconds } from '../../src/utils';

const prisma = new PrismaClient();

export type TestAccount = {
  type?: string;
  provider?: string;
  providerAccountId?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
};

export type TestUser = {
  email?: string;
  name?: string;
  password?: string;
  image?: string;
  emailVerified?: Date;
};

export const createTestUser = ({
  email = process.env.TEST_USER,
  name = 'E2E TestUser',
  password = process.env.TEST_PW,
  image = 'https://lh3.googleusercontent.com/a/AEdFTp7b1H5UgOeiJi2TdvJ5JVJOs2_HZDcWvV-R6eqConk=s96-c',
  emailVerified = addDays(new Date(), -3),
}: TestUser) => {
  return { email, name, password, image, emailVerified };
};

export const createTestUserAccount = ({
  type = 'oauth',
  provider = 'google',
  providerAccountId = String(process.env.PROVIDER_ACCOUNT_ID),
  access_token = String(process.env.PROVIDER_ACCESS_TOKEN),
  expires_at = dateToSeconds(addDays(new Date(), 2)),
  token_type = 'bearer',
  scope = String(process.env.PROVIDER_SCOPE),
  id_token = String(process.env.PROVIDER_ID_TOKEN),
}: TestAccount) => {
  return {
    type,
    provider,
    providerAccountId,
    access_token,
    expires_at,
    token_type,
    scope,
    id_token,
  };
};

export function upsertTestUsers(arrayOfUsers: TestUser[]) {
  arrayOfUsers.map(async (user) => {
    return createSession(
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: { ...user },
      })
    );
  });
}
