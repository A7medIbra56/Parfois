import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "@layouts/MainLayout/MainLayout";

// Pages
import Home from "@pages/Home";
import Brands from "@pages/Brands";
import Cart from "@pages/Cart";
import Products from "@pages/Products";
import Wishlist from "@pages/Wishlist";
import Register from "@pages/Register";
import Login from "@pages/Login";
import GetProductDetails from "@pages/GetProductDetails";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/productDetails" element={<GetProductDetails/>}>
            <Route path=":id" element={<GetProductDetails/>} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="products" element={<Products />} />
          <Route path="brands" element={<Brands />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

const NotFound = () => {
  return <h2>404: Page Not Found</h2>;
};

export default AppRouter;
