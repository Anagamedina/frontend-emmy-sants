import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import AddProductPage from "./pages/AdminPages/AddProductPage";
import ProductDetailsPage from "./pages/AdminPages/ProductDetailsPage";
import { CartProvider } from './context/cart.jsx'
import { Cart } from "./components/Cart";
function App() {
  return (
    <div className="App">
      <CartProvider>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
    <Cart></Cart> 
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
      </CartProvider>
    </div>
  );
}

export default App;