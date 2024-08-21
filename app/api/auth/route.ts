// pages/api/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  login,
  logout,
  getSession,
  updateSession,
} from '../../../lib/serverAuth';

export async function POST(req: NextRequest) {
  return await login(req);
}

export async function DELETE(req: NextRequest) {
  return await logout();
}

export async function GET(req: NextRequest) {
  return await getSession(req);
}

export async function PUT(req: NextRequest) {
  return await updateSession(req);
}
