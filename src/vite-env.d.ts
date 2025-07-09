/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

declare module "inventory/App" {
  import { FC } from "react";

  export const App: FC<any>;
}

declare module "analytics/App" {
  import { FC } from "react";

  export const App: FC<any>;
}

declare module "sales/App" {
  import { FC } from "react";

  export const App: FC<any>;
}
