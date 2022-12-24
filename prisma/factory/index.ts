import { addDays, dateToSeconds } from '../../src/utils';

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
