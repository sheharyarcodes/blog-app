import React from "react";
import { Container, Login as LoginComponent } from "@/components";

const Login = () => {
  return (
    <Container className="h-[calc(100vh-10rem)] flex justify-center items-center">
      <LoginComponent />
    </Container>
  );
};

export default Login;
