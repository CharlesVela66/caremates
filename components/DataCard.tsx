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
  DropdownMenuCheckboxItem,
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
  onTaskCreated,
}: {
  data: Task;
  onTaskCreated: () => void;
}) => {
  const { toast } = useToast();

  const deleteTask = async (id: string) => {
    const hasConfirmed = confirm('Are you sure you want to delete this task?');
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/tasks/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        toast({
          title: 'Task deleted successfully',
          description: 'The task has been removed from the list.',
        });
        // Fetch the updated list of tasks
        onTaskCreated();
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
