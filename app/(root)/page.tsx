'use client';

import DataCard from '@/components/DataCard';
import { DataTable } from '@/components/DataTable';
import { DialogButton } from '@/components/DialogButton';
import { ProgressBar } from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Task } from '@/types';
import { TabsContent } from '@radix-ui/react-tabs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Home page
const Home = () => {
  // Use state for retrieving the tasks from the database
  const [tasks, setTasks] = useState<Task[]>([]);
  // Use state for saving the value of the progress of the tasks
  const [progress, setProgress] = useState(0);
  // Use state to set the current page in the cards section
  const [currentPage, setCurrentPage] = useState(0);

  // Number of cards in the cards section
  const itemsPerPage = 6;

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = tasks.slice(startIndex, endIndex);

  // Method to calculate how many tasks have been completed
  // Params:
  // data:  Array of tasks
  //
  // returns: Percentage of completed tasks
  const calculateProgress = (data: Task[]) => {
    const tasksWithSuccessfulStatus = data.filter(
      (task: Task) => task.status === 'completed'
    ).length;
    return Math.floor((tasksWithSuccessfulStatus / data.length) * 100);
  };

  // Method that calls the API to GET ALL the tasks from the database
  const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const data = await response.json();

    // Set the tasks equal to the response from the API
    setTasks(data);
  };

  // When the page loads, get the tasks from the database
  useEffect(() => {
    fetchTasks();
  }, []);

  // When the 'tasks' useState changes, call the calculateProgress function and set the updated progress
  useEffect(() => {
    if (tasks.length > 0) {
      const newProgress = calculateProgress(tasks);
      setProgress(newProgress);
    }
  }, [tasks]);

  return (
    <section className="home-content">
      {/* Header section */}
      <div className="home-title flex justify-between">
        <h1>Welcome, Carlos</h1>
        <Link href="/sign-in">
          <Button>Log out</Button>
        </Link>
      </div>
      {/* Progress Bar section */}
      <div className="w-full flex flex-col">
        <h2 className="header-2 mb-4">Task Progress</h2>
        <ProgressBar value={progress} />
      </div>
      {/* Tabs section */}
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="table" className="w-full">
          <div className="flex flex-row justify-between mb-2">
            <div className="mr-12">
              {/* Create Button */}
              <DialogButton onTaskCreated={fetchTasks} />
            </div>
            {/* Display the tabs */}
            <TabsList className="grid w-[150px] justify-end grid-cols-2 ">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
          </div>
          {/* Display the table for tabs=table */}
          <TabsContent value="table" className="w-full">
            <DataTable data={tasks} onTaskCreated={fetchTasks} />
          </TabsContent>
          {/* Display the card section for tabs=cards */}
          <TabsContent value="cards" className="w-full mt-12 ">
            {paginatedTasks.length > 0 ? (
              <div className="flex flex-wrap justify-normal gap-4 max-w-fit">
                {paginatedTasks.map((task) => (
                  <DataCard
                    data={task}
                    key={task.id}
                    onTaskCreated={() => fetchTasks()}
                  />
                ))}
              </div>
            ) : (
              <p className="h-24 text-center text-14">No results.</p>
            )}
            {/* Pagination for cards section */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {tasks.length === 0
                  ? '0-0 of 0 task(s)'
                  : `${startIndex + 1} - ${Math.min(endIndex, tasks.length)} of ${tasks.length} task(s)`}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={currentPage === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                  }
                  disabled={currentPage === totalPages - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Home;
