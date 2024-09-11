import { createBrowserRouter } from "react-router-dom";

import AdminUsers from "pages/admin/Users";
import AdminCategories from "pages/admin/Categories";
import AdminNewsletter from "pages/admin/Newsletter";
import AdminProducts from "pages/admin/Products";
import AdminOrders from "pages/admin/Orders";
import AdminAccounting from "pages/admin/Accounting";
import OrderPage from "pages/OrderPage";
import AdminPromocodes from "pages/admin/Promocodes";
import MainPage from "./pages/MainPage";
import ReplacementRules from "./pages/ReplacementRules";
import Contacts from "./pages/Contacts";
import PageNotFound from "./pages/PageNotFound";
import ProductSinglePage from "./pages/ProductSinglePage";
import SignIn from "./pages/admin/SignIn";
import Layout from "./lib/components/Layout";
import Redirect from "./lib/ui/Redirect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/replacement-rules",
    element: <ReplacementRules />,
  },
  {
    path: "/uniquizer",
    element: <Redirect to="https://t.me/rocket_uniq_bot" />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  // Admin
  {
    path: "/xxxopernDyn5fYk/admin/login",
    element: <SignIn />,
  },
  {
    path: "/xxxopernDyn5fYk/admin/accounting",
    element: <AdminAccounting />,
  },
  {
    path: "/xxxopernDyn5fYk/admin/users",
    element: <AdminUsers />,
  },
  {
    path: "/xxxopernDyn5fYk/admin/categories",
    element: <AdminCategories />,
  },
  {
    path: "/xxxopernDyn5fYk/admin/products",
    element: <AdminProducts />,
  },
  {
    path: "/xxxopernDyn5fYk/admin/orders",
    element: <AdminOrders />,
  },
  {
    path: "/xxxopernDyn5fYk/admin/newsletter",
    element: <AdminNewsletter />,
  },
  {
    path: "/xxxopernDyn5fYk/admin/promocodes",
    element: <AdminPromocodes />,
  },
  {
    path: "/product/:productId",
    element: (
      <Layout>
        <ProductSinglePage />
      </Layout>
    ),
  },
  {
    path: "/categories/:categoryIds",
    element: <MainPage />,
  },
  {
    path: "/categories",
    element: <MainPage />,
  },
  // 404
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
