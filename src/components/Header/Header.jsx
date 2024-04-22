import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Navigation from "./child/Navigation";
import Container from "../container/Container";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${search.toLowerCase().replaceAll(" ", "-")}`);
    setSearch("");
  };

  return (
    <Container>
      <header className="flex gap-2 justify-between h-20 w-full items-center">
        <form
          onSubmit={handleSearch}
          className="flex flex-1 items-center gap-2"
        >
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search by title..."
          />
          <Button type="submit">Search</Button>
        </form>
        <Navigation />
      </header>
    </Container>
  );
};

export default Header;
