
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import SocialLogin from './components/social-login';


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