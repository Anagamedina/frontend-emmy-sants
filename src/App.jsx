import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import AddProductPage from "./pages/AdminPages/AddProductPage";
import ProductDetailsPage from "./pages/AdminPages/ProductDetailsPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/admin/product"
          element={
            // <IsPrivate>
              <AddProductPage />
            // </IsPrivate>
          }
        />

<Route
          path="/admin/products/:id"
          element={
            // <IsPrivate>
              <ProductDetailsPage />
            // </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;