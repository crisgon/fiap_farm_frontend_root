import { Routes, Route } from "react-router";
import "./App.css";
import AnalyticsApp from "analytics/App";
import InventoryApp from "inventory/App";

import SalesApp from "sales/App";

import { Header } from "./components/header";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<AnalyticsApp />} />
        <Route path="/sales" element={<SalesApp />} />
        <Route path="/inventory" element={<InventoryApp />} />
      </Routes>
    </>
  );
}

export default App;
