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

const SignIn = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-[350px] space-y-2">
        <CardHeader className="space-y-4">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter the Caremates System in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="POST" action="/api/auth" className="space-y-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstName">Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>
            <Button type="submit">Sign In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
