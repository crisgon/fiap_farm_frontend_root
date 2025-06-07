import { Link } from "react-router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";

import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Tractor } from "lucide-react";

export function Header() {
  return (
    <header className="w-full">
      <div className="flex items-center justify-between max-w-[900px] m-auto">
        <Tractor />
        <NavigationMenu viewport={false} className="m-auto p-4">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/inventory">Estoque</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/sales">Vendas</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Avatar>
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
