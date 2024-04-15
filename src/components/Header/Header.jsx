import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Navigation from "./child/Navigation";
import Container from "../container/Container";
const Header = () => {
  return (
    <Container>
      <header className="flex gap-2 justify-between h-20 w-full items-center">
        <form className="flex flex-1 items-center gap-2">
          <Input type="text" placeholder="Search by title..." />
          <Button type="submit">Search</Button>
        </form>

        <Navigation />
      </header>
    </Container>
  );
};

export default Header;
