import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

const AnalyticsHome = lazy(() =>
  import("analytics/modules").then((module) => ({
    default: module.default.Home,
  }))
);

const SalesHome = lazy(() =>
  import("sales/modules").then((module) => ({
    default: module.default.Home,
  }))
);

const InventoryHome = lazy(() =>
  import("inventory/modules").then((module) => ({
    default: module.default.Home,
  }))
);

const InventoryProducts = lazy(() =>
  import("inventory/modules").then((module) => ({
    default: module.default.Products,
  }))
);

import { Header } from "./components/header";

function App() {
  return (
    <>
      <Header />

      <Suspense fallback="Carregando...">
        <Routes>
          <Route path="/" element={<AnalyticsHome />} />
          <Route path="/sales" element={<SalesHome />} />
          <Route path="/inventory" element={<InventoryHome />} />

          <Route path="/inventory/products" element={<InventoryProducts />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
