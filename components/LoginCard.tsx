import { login } from '@/app/api/auth/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';

import React from 'react';

const LoginCard = () => {
  return (
    <Card className="w-[350px] space-y-2">
      <CardHeader className="space-y-4">
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter the Caremates System in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Form to handle user sign-in */}
        <form
          action={async (formData) => {
            'use server';
            // Call the login function with form data
            await login(formData);
            // Redirect to the home page after successful login
            redirect('/');
          }}
          className="space-y-4"
        >
          <div className="grid w-full items-center gap-4">
            {/* Input for first name */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Your name"
                required
                maxLength={30}
              />
            </div>
            {/* Input for last name */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Your last name"
                required
                maxLength={30}
              />
            </div>
          </div>
          {/* Submit button for the form */}
          <Button type="submit">Sign In</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
