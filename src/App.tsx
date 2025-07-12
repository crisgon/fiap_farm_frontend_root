import { lazy, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation, useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Login } from "./modules/auth/login";
import { setUser } from "./stores/redux/slices/authSlice";
import { firebase } from "./infrastructure/firebase/config";
import { useAppDispatch, useAppSelector } from "./stores/redux/hooks";
import Spinner from "./components/spinner";
import { Register } from "./modules/auth/register";

const AnalyticsApp = lazy(() =>
  import("analytics/App").then((module) => ({
    default: module.default.App,
  }))
);

const SalesApp = lazy(() =>
  import("sales/App").then((module) => ({
    default: module.default.App,
  }))
);

const InventoryApp = lazy(() =>
  import("inventory/App").then((module) => {
    return {
      default: module.default.App,
    };
  })
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
  const user = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser(firebaseUser));

        setIsLoading(false);
        navigate("/home");
      } else {
        setUser(null);
        setIsLoading(false);
        navigate(location.pathname === "/register" ? "/register" : "/login");
      }
    });

    return () => {
      unsubscribe();
    };
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
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                <LoggedArea>
                  <AnalyticsApp user={user} />
                </LoggedArea>
              }
            />
            <Route
              path="/sales/*"
              element={
                <LoggedArea>
                  <SalesApp user={user} />
                </LoggedArea>
              }
            />
            <Route
              path="/inventory/*"
              element={
                <LoggedArea>
                  <InventoryApp user={user} />
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
