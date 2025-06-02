import { Routes, Route, Link } from "react-router";
import "./App.css";
import AnalyticsApp from "analytics/App";
import InventoryApp from "inventory/App";

import SalesApp from "sales/App";

function App() {
  return (
    <>
      <header>
        HOST APP
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sales">Sales</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
        </ul>
      </header>

      <Routes>
        <Route path="/" element={<AnalyticsApp />} />
        <Route path="/sales" element={<SalesApp />} />
        <Route path="/inventory" element={<InventoryApp />} />
      </Routes>
    </>
  );
}

export default App;
