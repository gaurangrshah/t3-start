import * as jwt from 'jsonwebtoken';
import type { JWT } from 'next-auth/jwt';

import { composeUrl } from '@/utils/fns';

/** THIS FILE IS CURRENTLY NOT IMPLEMENTED-- SAVED AS A REFERENCE
 * @SEE: https://tinyurl.com/2gnnzhky
 */
export const refreshAccessToken = async (token: JWT) => {
  try {
    const url = composeUrl(`https://oauth2.googleapis.com/token?`, {
      client_id: process.env.GOOGLE_CLIENT_ID ?? '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    }).toString();

    const r = await fetch(url, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
    });

    const refreshedTokens = await r.json();

    if (!r.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      // Fall back to old refresh token
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return { ...token, error: 'RefreshAccessTokenError' };
  }
};

/**
 * @SEE: https://tinyurl.com/2mokc9p6
 *
 * @export
 * @param {JWT} tokenToSign
 * @return {*}  {string}
 */
export function generateToken(tokenToSign: JWT): string {
  const token = jwt.sign(tokenToSign, String(process.env.JWT_SECRET), {
    expiresIn: process.env.JWT_EXPIRED_TIME,
  });
  return token;
}

/**
 * @SEE: https://tinyurl.com/2mokc9p6
 *
 * To generate jwt token for admin@socialgames.com admin-user
 * @param tokenToSign contains user_id
 */
export function generateAdminToken(tokenToSign: JWT): string {
  const token = jwt.sign(tokenToSign, String(process.env.JWT_SECRET));
  return token;
}

export async function verify(token: string): Promise<JWT> {
  try {
    const payload = jwt.verify(token, String(process.env.JWT_SECRET)) as JWT;
    return { user_id: payload.user_id };
  } catch (e) {
    console.log(e);
    throw new Error('verification error');
  }
}

/**
 * @SEE: https://tinyurl.com/2mokc9p6
 *
 * @export
 * @param {Request} request
 * @return {*}  {string}
 */
export function getTokenFromHeader(request: Request): string {
  let token = request.headers.get('x-access-token');

  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    return (token = token.slice(7, token.length));
  }
  return token as string;
}
