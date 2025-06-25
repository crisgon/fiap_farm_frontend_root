/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

declare module "analytics/modules" {
  import { FC } from "react";

  export const Home: FC<any>;
}

declare module "inventory/modules" {
  import { FC } from "react";

  export const Home: FC<any>;
  export const Products: FC<any>;
}

declare module "sales/modules" {
  import { FC } from "react";

  export const Home: FC<any>;
}
