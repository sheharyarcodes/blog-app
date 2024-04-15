import React from "react";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import ButtonsContainer from "./ButtonsContainer";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import authSlice from "@/features/auth/authSlice";
import { v4 as uuid } from "uuid";

const Navigation = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      isActive: true,
      id: uuid(),
    },
    {
      name: "All Posts",
      slug: "/posts/all",
      isActive: true,
      id: uuid(),
    },
    {
      name: "My Posts",
      slug: "/",
      isActive: authStatus,
      id: uuid(),
    },
    {
      name: "Add Post",
      slug: "/post/add",
      isActive: authStatus,
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
              <Link
                className={`rounded bg-transparent px-2 py-1 text-sm font-medium transition-colors whitespace-nowrap ${
                  item.isActive
                    ? "hover:bg-gray-100 hover:text-gray-900"
                    : "hover:bg-red-100 cursor-not-allowed opacity-20"
                }`}
                to={item.isActive && item.slug}
              >
                {item.name}
              </Link>
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
              <Link
                key={item.id}
                className={`flex w-full items-center py-2 text-lg font-semibold ${
                  !item.isActive && "opacity-20"
                }`}
                to={item.isActive && item.slug}
              >
                {item.name}
              </Link>
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
