import React from "react";
import { Container, SignUp as SignUpComponent } from "@/components";

const SignUp = () => {
  return (
    <Container className="h-[calc(100vh-10rem)] flex justify-center items-center">
      <SignUpComponent />
    </Container>
  );
};

export default SignUp;
