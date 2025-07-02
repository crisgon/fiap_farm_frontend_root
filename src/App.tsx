import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route, useLocation } from "react-router";

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

import { Alert, AlertTitle } from "@/components/ui/alert";

function ModuleErrorFallback() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <Alert variant="destructive" className="max-w-md w-full text-center">
        <AlertTitle className="text-xl font-bold">
          Erro ao carregar módulo
        </AlertTitle>
      </Alert>
    </div>
  );
}

function SuspenseFallback() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <Alert variant="default" className="max-w-md w-full text-center">
        <AlertTitle className="text-xl font-bold">Carregando...</AlertTitle>
      </Alert>
    </div>
  );
}

function App() {
  const location = useLocation();
  return (
    <>
      <Header />

      <Suspense fallback={<SuspenseFallback />}>
        <ErrorBoundary
          FallbackComponent={ModuleErrorFallback}
          resetKeys={[location.pathname]}
        >
          <Routes>
            <Route path="/" element={<AnalyticsHome />} />
            <Route path="/sales" element={<SalesHome />} />
            <Route path="/inventory" element={<InventoryHome />} />

            <Route path="/inventory/products" element={<InventoryProducts />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default App;
