'use client';

import React, { useEffect, useState } from 'react';
import DataCard from './DataCard';
import { Task } from '@/types';
import { Button } from './ui/button';

const CardsSection = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  //   const calculateProgress = (data: Task[]) => {
  //     const tasksWithSuccessfulStatus = data.filter(
  //       (task: Task) => task.status === 'completed'
  //     ).length;
  //     return Math.floor((tasksWithSuccessfulStatus / data.length) * 100);
  //   };

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const data = await response.json();

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  //   useEffect(() => {
  //     if (tasks.length > 0) {
  //       const newProgress = calculateProgress(tasks);
  //       setProgress(newProgress);
  //     }
  //   }, [tasks]);

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = tasks.slice(startIndex, endIndex);
  return (
    <section>
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
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
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
    </section>
  );
};

export default CardsSection;
