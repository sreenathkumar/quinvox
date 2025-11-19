import Link from 'next/link';
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SocialLogin from './components/social-login';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

async function SigninPage() {

  return (
    <Card className="w-full max-w-sm ">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Let's Get Started</CardTitle>
        <CardDescription className='text-center'>
          Login with your favorite social platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SocialLogin />
      </CardContent>
    </Card>
  );
}

export default SigninPage;