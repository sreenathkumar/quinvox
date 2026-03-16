
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import SocialLogin from './components/social-login';
import { Suspense } from "react";


async function SigninPage() {

  return (
    <main className="container mx-auto flex-1 flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Let's Get Started</CardTitle>
          <CardDescription className='text-center'>
            Login with your favorite social platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <SocialLogin />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}

export default SigninPage;