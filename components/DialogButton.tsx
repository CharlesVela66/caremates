'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from './ui/use-toast';

export function DialogButton({ onTaskCreated }: { onTaskCreated: () => void }) {
  const { toast } = useToast();

  // useState to save the name of the new task
  const [name, setName] = useState('');
  // useState to save the description of the new task
  const [description, setDescription] = useState('');
  // useState to save the status of the new task
  const [status, setStatus] = useState('not_completed');
  // useState to help control the visibility of the modal
  const [isOpen, setIsOpen] = useState(false);

  // Function to create a new task
  const createTask = async () => {
    // Create an object
    const task = { name, description, status };
    try {
      // Call the method POST from the API
      const response = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
      });

      // If the response wasn't successful then send error
      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      // If the response was successful then send toast and close the modal
      setIsOpen(false);
      toast({
        title: 'Task created successfully',
        description: 'The task has been added to the list.',
      });
      // Fetch the tasks
      onTaskCreated();
    } catch (error) {
      toast({
        title: 'Oops! The task could not be created',
        variant: 'destructive',
      });
    }
  };

  // Function that resets the input values when the dialog opens
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setName('');
      setDescription('');
      setStatus('not_completed');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* Button section */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-16 max-w-fit"
          onClick={() => setIsOpen(true)}
        >
          New +
        </Button>
      </DialogTrigger>
      {/* Modal content */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Create a new task</DialogDescription>
        </DialogHeader>
        {/* Input section */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              required
              placeholder="Task Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              required
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
            />
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              defaultValue="not_completed"
              required
              onValueChange={(value) => setStatus(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="not_completed">Not completed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Submit button */}
        <DialogFooter>
          <Button type="submit" onClick={createTask}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
