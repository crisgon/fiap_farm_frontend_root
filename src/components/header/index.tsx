import { Link } from "react-router";

import { HandCoins, House, Package, Tractor, LeafyGreen } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/stores/redux/hooks";

export function Header() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="w-full bg-primary">
      <div className="flex items-center justify-between max-w-5xl m-auto">
        <h1 className="font-bold text-white">Fiap Farm</h1>
        <NavigationMenu viewport={false} className="m-auto p-4">
          <NavigationMenuList className="gap-12">
            <NavigationMenuItem className="text-white hover:text-black">
              <Link className="flex flex-row items-center gap-4" to="/">
                <House className="text-inherit" /> Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="text-white hover:text-black">
              <Link
                className="flex flex-row items-center gap-4"
                to="/inventory/products"
              >
                <LeafyGreen className="text-inherit" /> Produtos
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="text-white hover:text-black">
              <Link className="flex flex-row items-center gap-4" to="/">
                <Tractor className="text-inherit" /> Produção
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="text-white hover:text-black">
              <Link
                className="flex flex-row items-center gap-4"
                to="/inventory"
              >
                <Package className="text-inherit" /> Estoque
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="text-white hover:text-black">
              <Link className="flex flex-row items-center gap-4" to="/sales">
                <HandCoins className="text-inherit" /> Vendas
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Avatar>
          <AvatarFallback>
            {(user?.displayName ?? user?.email)?.split("")[0]}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
