import { NextRequest, NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Secret key for signing and verifying JWTs
const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);
const EXPIRATION_TIME = 30 * 60 * 1000;

// Function to encrypt payload into a JWT
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // Set the algorithm
    .setIssuedAt() // Set the issued at time
    .setExpirationTime(`${EXPIRATION_TIME / 1000}s`) // Set the expiration time
    .sign(key); // Sign the JWT with the key
}

// Function to decrypt a JWT and return the payload
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'], // Specify the algorithm
  });
  return payload; // Return the decrypted payload
}

// Function to handle user login
export async function login(formData: FormData) {
  console.time('login');
  // Extract user information from form data
  const user = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
  };

  // Create the session with an expiration time
  const expires = new Date(Date.now() + EXPIRATION_TIME);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set('session', session, { expires, httpOnly: true });
  console.timeEnd('login');
}

// Function to handle user logout
export async function logout() {
  // Destroy the session by setting the cookie to expire immediately
  cookies().set('session', '', { expires: new Date(0) });
}

// Function to get the current session
export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null; // Return null if no session is found
  return await decrypt(session); // Decrypt and return the session
}

// Function to update the session to extend its expiration time
export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return; // Return if no session is found

  // Refresh the session expiration time
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + EXPIRATION_TIME);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res; // Return the response with the updated session cookie
}
