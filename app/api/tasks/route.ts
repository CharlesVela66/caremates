import { connectToDB } from '@/lib/database';
import Task from '@/models/task';
import { Task as TaskType } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectToDB();

    // Fetch tasks from MongoDB
    const tasks = await Task.find({});

    // Transform the tasks to match your TypeScript type
    const tasksData: TaskType[] = tasks.map((task) => ({
      id: task._id.toString(),
      name: task.name,
      description: task.description,
      status: task.status as 'completed' | 'not_completed',
    }));

    return new NextResponse(JSON.stringify(tasksData), { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to fetch all tasks', { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const { name, description, status } = await req.json();

  try {
    connectToDB();
    const newTask = new Task({
      name,
      description,
      status,
    });

    await newTask.save();

    return new NextResponse(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to create task' }),
      {
        status: 500,
      }
    );
  }
};
