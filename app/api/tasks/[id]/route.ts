import { connectToDB } from '@/lib/database';
import Task from '@/models/task';
import { NextRequest, NextResponse } from 'next/server';

// Function to delete a specific task
// params:
// req: Request from the user
// id: Task's id
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // Await to connect to the database
    await connectToDB();

    // Find the task by Id and delete. All in one!
    await Task.findByIdAndDelete(params.id);
    return new NextResponse('Task successfully deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return new NextResponse('Failed to delete task', { status: 500 });
  }
};
