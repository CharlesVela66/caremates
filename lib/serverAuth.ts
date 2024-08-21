// lib/serverAuth.ts
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function login(req: NextRequest) {
  const formData = await req.formData();
  const user = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
  };

  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  const res = NextResponse.next();
  res.cookies.set('session', session, { expires, httpOnly: true });
  return res;
}

export async function logout() {
  const res = NextResponse.next();
  res.cookies.set('session', '', { expires: new Date(0) });
  return res;
}

export async function getSession(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
