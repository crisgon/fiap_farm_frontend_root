import { lazy, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route, useLocation, useNavigate } from "react-router";
import { Header } from "./components/header";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Login } from "./modules/auth/login";
import { setUser } from "./stores/redux/slices/authSlice";
import { firebase } from "./infrastructure/firebase/config";
import { useAppDispatch } from "./stores/redux/hooks";
import Spinner from "./components/spinner";

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

function ModuleErrorFallback() {
  return (
    <>
      <Header />
      <div className="flex h-[60vh] items-center justify-center">
        <Alert variant="destructive" className="max-w-md w-full text-center">
          <AlertTitle className="text-xl font-bold">
            Erro ao carregar módulo
          </AlertTitle>
        </Alert>
      </div>
    </>
  );
}

function SuspenseFallback() {
  return (
    <>
      <Header />
      <div className="flex h-[60vh] items-center justify-center">
        <Alert variant="default" className="max-w-md w-full text-center">
          <AlertTitle className="text-xl font-bold">Carregando...</AlertTitle>
        </Alert>
      </div>
    </>
  );
}

function LoggedArea({ children }: { children: React.JSX.Element }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser(firebaseUser));
        setIsLoading(false);
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<SuspenseFallback />}>
        <ErrorBoundary
          FallbackComponent={ModuleErrorFallback}
          resetKeys={[location.pathname]}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <LoggedArea>
                  <AnalyticsHome />
                </LoggedArea>
              }
            />
            <Route
              path="/sales"
              element={
                <LoggedArea>
                  <SalesHome />
                </LoggedArea>
              }
            />
            <Route
              path="/inventory"
              element={
                <LoggedArea>
                  <InventoryHome />
                </LoggedArea>
              }
            />

            <Route
              path="/inventory/products"
              element={
                <LoggedArea>
                  <InventoryProducts />
                </LoggedArea>
              }
            />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default App;
