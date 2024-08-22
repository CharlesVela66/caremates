import LoginCard from '@/components/LoginCard';

// SignIn component: Renders the sign-in page
const SignIn = async () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* Card component to contain the sign-in form */}
      <LoginCard />
    </div>
  );
};

export default SignIn;
