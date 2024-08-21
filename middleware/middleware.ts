import { NextRequest } from 'next/server';
import { updateSession } from '../app/api/auth/route';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
