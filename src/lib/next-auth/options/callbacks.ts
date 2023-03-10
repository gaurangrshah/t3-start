import type { CallbacksOptions } from 'next-auth';

export const jwt: CallbacksOptions['jwt'] = ({ token, account, profile }) => {
  if (account) {
    token.accessToken = account.access_token;
    token.id = profile?.sub;
  }

  return token;
};

export const session: CallbacksOptions['session'] = ({
  session,
  user,
  token,
}) => {
  if (session.user) {
    session.user.id = user?.id;
    if (!session?.accessToken) {
      session.accessToken = token?.accessToken;
    }
  }
  return session;
};
