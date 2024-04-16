import React from "react";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";
import ButtonsContainer from "./ButtonsContainer";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";

const Navigation = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      show: true,
      id: uuid(),
    },
    {
      name: "All Posts",
      slug: "/posts/all",
      show: true,
      id: uuid(),
    },
    // {
    //   name: "My Posts",
    //   slug: `/posts/${userId}`,
    //   show: authStatus,
    //   id: uuid(),
    // },
    {
      name: "Add Post",
      slug: "/post/add",
      show: authStatus,
      id: uuid(),
    },
  ];

  return (
    <div>
      {/* desktop navigation */}
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList className="flex md:mx-10 lg:mx-20 xl:mx-40 gap-2">
          {navItems.map((item) => (
            <NavigationMenuLink key={item.id} asChild>
              <NavLink
                className={`
                rounded px-2 py-1 text-sm font-medium transition-colors whitespace-nowrap
                ${
                  item.show
                    ? "hover:bg-gray-100 hover:text-gray-900"
                    : "hover:bg-red-100 cursor-not-allowed opacity-20"
                }
                ${({ isActive }) =>
                  isActive ? "bg-gray-100 text-gray-900" : "bg-transparent"}
              `}
                to={item.show && item.slug}
              >
                {item.name}
              </NavLink>
            </NavigationMenuLink>
          ))}
        </NavigationMenuList>
        <ButtonsContainer />
      </NavigationMenu>

      {/* mobile navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between" side="right">
          <div className="grid gap-2 py-6">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                className={`
                rounded px-2 py-1 text-sm font-medium transition-colors whitespace-nowrap
                ${
                  item.show
                    ? "hover:bg-gray-100 hover:text-gray-900"
                    : "hover:bg-red-100 cursor-not-allowed opacity-20"
                }
                ${({ isActive }) =>
                  isActive ? "bg-gray-100 text-gray-900" : "bg-transparent"}
              `}
                to={item.show && item.slug}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <ButtonsContainer />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navigation;

// menu icon as navigation button
function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
