import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AddProductPage from "./pages/AdminPages/AddProductPage";
import ProductDetailsPage from "./pages/AdminPages/ProductDetailsPage";
import ProductsListPage from "./pages/AdminPages/ProductsListPage";
import OrdersPage from "./pages/AdminPages/OrdersPage";
import SignupPage from "./pages/SignupPage/SignupPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import PlantasPage from "./pages/ProductsPages/PlantasPage";
import RamosPage from "./pages/ProductsPages/RamosPage";
import UserPlantasDetailsPage from "./pages/ProductsPages/UserPlantasDetailsPage";
import UserRamosDetailsPage from "./pages/ProductsPages/UserRamosDetailsPage";
import CustomNavbar from "./components/Navbar/CustomNavbar";
import ShoppingCartPage from "./pages/ProductsPages/ShoppingCartPage";

// import IsPrivate from "./components/IsPrivate/IsPrivate"

function App() {
  return (
    <div className="App">
      <CustomNavbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/plantas"
          element={
              <PlantasPage />
          }
        />

        <Route
          path="/flores"
          element={
              <RamosPage />
          }
        />
        
        <Route
          path="product/plantas/:id"
          element={< UserPlantasDetailsPage/>}
        />

<Route
          path="product/ramos/:id"
          element={< UserRamosDetailsPage/>}
        />

       
        <Route
          path="/signup"
          element={
              <SignupPage />
          }
        />

        <Route
          path="/login"
          element={
            // <IsPrivate>
              <LoginPage />
            // </IsPrivate>
          }
        />

        <Route
          path="/admin/product"
          element={
            // <IsPrivate>
              <ProductsListPage />
            // </IsPrivate>
          }
        />
      <Route
          path="/admin/add-product"
          element={
            // <IsPrivate>
              <AddProductPage />
            // </IsPrivate>
          }
        />
         <Route
          path="/admin/orders"
          element={
            // <IsPrivate>
              <OrdersPage />
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

<Route
          path="/products/shoppingcart"
          element={
            // <IsPrivate>
              <ShoppingCartPage />
            // </IsPrivate>
          }
        />

        
      </Routes>

      
    </div>
  );
}

export default App;

