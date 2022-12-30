import { Prisma } from '@prisma/client';

import { addDays } from '../../../../utils';

type TestUser = Prisma.UserCreateArgs['data'];

export const createTestUser = ({
  email = 'e2e@e2e.test',
  name = 'e2e',
  password = 'test',
  image = '',
  emailVerified = addDays(new Date(), -3),
  roleType = 'test',
}: Partial<TestUser>): TestUser => ({
  email,
  name,
  password,
  image,
  emailVerified,
  roleType,
});
