import { connectToDB } from '@/lib/database';
import Task from '@/models/task';
import { Task as TaskType } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

// Function to get all the tasks from the database
export const GET = async () => {
  try {
    // Await to connect to the database
    await connectToDB();

    // Fetch tasks from MongoDB
    const tasks = await Task.find({});

    // Transform the tasks to match Task type
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

// Function to create a new task and add it to the database
export const POST = async (req: NextRequest) => {
  // Save the request information into 3 constants
  const { name, description, status } = await req.json();

  try {
    // Await to connect to the database
    await connectToDB();

    // Create the object type Task to save it
    const newTask = new Task({
      name,
      description,
      status,
    });

    // Save it to the database
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
