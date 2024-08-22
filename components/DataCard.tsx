'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Task } from '@/types';
import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useToast } from './ui/use-toast';

const DataCard = ({
  data,
  onTaskDeleted,
}: {
  data: Task;
  onTaskDeleted: () => void;
}) => {
  // Definition of toast to give input to the user
  const { toast } = useToast();

  // Function to delete the task
  const deleteTask = async (id: string) => {
    // Pop up message to confirm deletion
    const hasConfirmed = confirm('Are you sure you want to delete this task?');
    // If the user confirmed the deletion
    if (hasConfirmed) {
      try {
        // Call the method DELETE fromt the API
        const response = await fetch(`/api/tasks/${id}`, {
          method: 'DELETE',
        });

        // If the response wasn't successful then send error
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }

        // If the response was successful then send toast
        toast({
          title: 'Task deleted successfully',
          description: 'The task has been removed from the list.',
        });
        // Fetch the updated list of tasks
        onTaskDeleted();
      } catch (error) {
        toast({
          title: 'Oops! The task could not be created',
          variant: 'destructive',
        });
      }
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="capitalize">
            {data.name.replace(/_/g, ' ')}
          </CardTitle>
          {/* Actions button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => deleteTask(data.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="capitalize">
          Status: {data.status.replace(/_/g, ' ')}
        </CardDescription>
      </CardHeader>
      <CardContent className="capitalize">
        <span className="justify-content break-words">{data.description}</span>
      </CardContent>
    </Card>
  );
};

export default DataCard;
