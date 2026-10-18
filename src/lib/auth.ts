import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'nexora_admin_session';

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  const secretKey = process.env.ADMIN_SECRET_KEY?.trim();

  if (!secretKey || !session || !session.value) {
    return false;
  }

  return session.value === secretKey;
}

export async function verifyAdminHeader(authHeader?: string | null): Promise<boolean> {
  const secretKey = process.env.ADMIN_SECRET_KEY?.trim();
  if (secretKey && authHeader?.startsWith('Bearer ') && authHeader.slice(7).trim() === secretKey) {
    return true;
  }
  return await isAdminAuthenticated();
}

export { ADMIN_COOKIE_NAME };
