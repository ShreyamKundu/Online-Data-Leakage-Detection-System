import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <SignUp path="/sign-up" redirectUrl={null} signInUrl="/sign-in" />
    </div>
  );
};

export default Signup;
