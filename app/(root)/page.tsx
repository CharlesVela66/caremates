import DataCard from '@/components/DataCard';
import { DataTable } from '@/components/DataTable';
import { DialogButton } from '@/components/Dialog';
import { ProgressBar } from '@/components/ProgressBar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Task } from '@/types';
import { TabsContent } from '@radix-ui/react-tabs';
import React from 'react';

const Home = () => {
  const data: Task[] = [
    {
      id: 'm5gr84i9',
      description: 'Char char char',
      status: 'success',
    },
    {
      id: '3u1reuv4',
      description: 'Char char char',
      status: 'success',
    },
    {
      id: 'derv1ws0',
      description: 'Char char char',
      status: 'processing',
    },
    {
      id: '5kma53ae',
      description: 'Char char char',
      status: 'success',
    },
    {
      id: 'bhqecj4p',
      description: 'Char char char',
      status: 'failed',
    },
  ];
  return (
    <section className="home-content">
      <div className="home-title">
        <h1>Welcome, Carlos</h1>
      </div>
      <DialogButton />
      <div className="flex flex-col gap-2">
        <div className="justify-end items-end"></div>
        <Tabs defaultValue="table" className="w-full">
          <div className="flex flex-row">
            <div className="w-full flex flex-col">
              <h2 className="header-2 my-4">Task Progress</h2>
              <ProgressBar />
            </div>
            <TabsList className="grid w-[200px] justify-end grid-cols-2 mt-6">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="table" className="w-full">
            <DataTable data={data} />
          </TabsContent>
          <TabsContent value="cards" className="w-full">
            <DataCard />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Home;
