import { Routes, Route } from "react-router";

import { Home as AnalyticsHome } from "analytics/modules";

import {
  Home as InventoryHome,
  Products as InventoryProducts,
} from "inventory/modules";

import { Home as SalesHome } from "sales/modules";

import { Header } from "./components/header";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<AnalyticsHome />} />
        <Route path="/sales" element={<SalesHome />} />
        <Route path="/inventory" element={<InventoryHome />} />

        <Route path="/inventory/products" element={<InventoryProducts />} />
      </Routes>
    </>
  );
}

export default App;
