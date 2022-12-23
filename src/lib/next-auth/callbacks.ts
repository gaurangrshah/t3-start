import type { CallbacksOptions } from 'next-auth';
import { refreshAccessToken } from './utils';

export const jwt: CallbacksOptions['jwt'] = ({
  token,
  user,
  account,
  profile,
}) => {
  if (user && account) {
    token.accessToken = account.access_token;
    token.refresh_token = account.refresh_token;
    token.id = profile?.sub ?? 'DEFAULT_ID';
    if (account.provider) {
      token.provider = account.provider;
      token.expires_at = account.expires_at;
    }
  }
  const isValidToken =
    token.accessTokenExpire && Date.now() < token.accessTokenExpire;

  if (isValidToken) {
    return account?.provider === 'google' ? refreshAccessToken(token) : token;
  }
  return token;
};

export const session: CallbacksOptions['session'] = ({
  session,
  user,
  token,
}) => {
  if (session.user) {
    if (!session.user?.id) {
      session.user.id = user?.id;
    }
    if (!session?.accessToken) {
      session.accessToken = token?.accessToken;
    }
  }
  return session;
};
