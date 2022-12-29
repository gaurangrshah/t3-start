/**
 * Inspired by BisonApp test utils:
 *
 * @SEE: https://github.com/echobind/bisonapp/blob/canary/packages/create-bison-app/template/tests
 */

import { Prisma, type User } from '@prisma/client';

import { hashPassword } from '@/lib/next-auth/services';
import { prisma } from '@/server/db/client';

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
});

type FactoryUpsertArgs = {
  where: Prisma.UserUpsertArgs['where'];
  createArgs: Partial<Prisma.UserUpsertArgs['create']>;
  updateArgs: Prisma.UserUpsertArgs['update'];
  select?: Prisma.UserUpsertArgs['select'];
};

export const UserFactory = {
  build: (
    args: Partial<Prisma.UserCreateArgs['data']> = {},
    select: Prisma.UserCreateArgs['select'] = {}
  ): Prisma.UserCreateArgs => {
    const password = args.password
      ? hashPassword(args.password)
      : hashPassword(String(process.env.TEST_PW));
    const defaultSelect = { ...select, ...defaultUserSelect };

    return {
      data: {
        email: process.env.TEST_USER,
        // roles: { set: [Role.USER] },
        ...args,
        password,
      },

      select: defaultSelect,
    };
  },

  create: async (
    args: Partial<Prisma.UserCreateArgs['data']> = {},
    select: Prisma.UserCreateArgs['select'] = {}
  ): Promise<User> => {
    const userArgs = UserFactory.build(args, select);

    const user = (await prisma.user.create(userArgs)) as User;
    return user;
  },

  upsert: async ({
    where,
    createArgs = {},
    updateArgs = {},
    select = {},
  }: FactoryUpsertArgs) => {
    // Grab Build Defaults for Create
    const userArgs = UserFactory.build(createArgs, select);
    const password = updateArgs.password
      ? hashPassword(updateArgs.password as string)
      : undefined;

    return await prisma.user.upsert({
      where,
      create: userArgs.data,
      select: userArgs.select,
      update: { ...updateArgs, password },
    });
  },
};
