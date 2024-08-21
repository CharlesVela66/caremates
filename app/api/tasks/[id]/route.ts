import { connectToDB } from '@/lib/database';
import Task from '@/models/task';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    await Task.findByIdAndDelete(params.id);
    return new NextResponse('Task successfully deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return new NextResponse('Failed to delete task', { status: 500 });
  }
};
