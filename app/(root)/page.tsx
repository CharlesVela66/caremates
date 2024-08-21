'use client';

import DataCard from '@/components/DataCard';
import { DataTable } from '@/components/DataTable';
import { DialogButton } from '@/components/DialogButton';
import { ProgressBar } from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Task } from '@/types';
import { TabsContent } from '@radix-ui/react-tabs';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Home = () => {
  //const session = getSession();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = tasks.slice(startIndex, endIndex);

  const calculateProgress = (data: Task[]) => {
    const tasksWithSuccessfulStatus = data.filter(
      (task: Task) => task.status === 'completed'
    ).length;
    return Math.floor((tasksWithSuccessfulStatus / data.length) * 100);
  };

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const data = await response.json();

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const newProgress = calculateProgress(tasks);
      setProgress(newProgress);
    }
  }, [tasks]);

  return (
    <section className="home-content">
      <div className="home-title flex justify-between">
        <h1>Welcome, Carlos</h1>
        <Link href="/sign-in">
          <Button>Log out</Button>
        </Link>
      </div>
      <div className="w-full flex flex-col">
        <h2 className="header-2 mb-4">Task Progress</h2>
        <ProgressBar value={progress} />
      </div>
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="table" className="w-full">
          <div className="flex flex-row justify-between mb-2">
            <div className="mr-12">
              <DialogButton onTaskCreated={fetchTasks} />
            </div>
            <TabsList className="grid w-[150px] justify-end grid-cols-2 ">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="table" className="w-full">
            <DataTable data={tasks} onTaskCreated={fetchTasks} />
          </TabsContent>
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
              <p className="h-24 text-center">No results</p>
            )}
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
