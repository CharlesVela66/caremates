'use client';

import * as React from 'react';

import { Progress } from '@/components/ui/progress';

export function ProgressBar({ value }: { value: number }) {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    setProgress(value);
  }, [value]);

  return <Progress value={progress} className="w-[60%]" />;
}
