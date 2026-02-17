import * as React from "react";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@radix-ui/react-navigation-menu";
import { ListItem } from "@/components/ui/ListItem";

const components = [
  {
    title: "Sign In",
    href: "/signin",
    description: "Already have an account? Sign in to your dashboard.",
  },
  {
    title: "Sign Up",
    href: "/signup",
    description: "New to MedCheck? Create an account to get started.",
  },
];

export default function NavigationBar() {
  return (
    <nav className="bg-white h-20 w-full flex items-center justify-center relative">
      <div className="flex items-center justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        
        <div className="absolute left-10 top-4 z-20"> 
          <Link to="/home">
            <img
              src="/logo.png"
              alt="MedCheck Logo"
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
            />
          </Link>
        </div>

        <div className="absolute right-10 top-6 z-20">
          <NavigationMenu>
            <NavigationMenuItem className="md:flex">
              <NavigationMenuTrigger>
                <MenuIcon size={30}></MenuIcon>
              </NavigationMenuTrigger>
              <NavigationMenuContent
                className="
                    absolute       
                    right-0       
                    top-full      
                    mt-10           
                    bg-white
                    rounded-lg
                    shadow-xl
                    border-100
                    border-amber-500
                    z-100       
                  "
              >
                <div className="p-50">
                  <ul
                  className="
                  md:grid              
                  md:grid-cols-       
                  gap-4 
                  p-4 
                  w-90vw            
                  max-w-100       
                  md:w-150 "
                  >
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}
