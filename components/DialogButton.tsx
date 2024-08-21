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

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('not_completed');
  const [isOpen, setIsOpen] = useState(false);

  const createTask = async () => {
    const task = { name, description, status };
    console.log(task);
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask = await response.json();
      console.log('Task created successfully:', newTask);

      setIsOpen(false);
      toast({
        title: 'Task created successfully',
        description: 'The task has been added to the list.',
      });
      onTaskCreated();
    } catch (error) {
      toast({
        title: 'Oops! The task could not be created',
        variant: 'destructive',
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // Reset the input values when the dialog opens
      setName('');
      setDescription('');
      setStatus('not_completed');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-16 max-w-fit"
          onClick={() => setIsOpen(true)}
        >
          New +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Create a new task</DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <Button type="submit" onClick={createTask}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
