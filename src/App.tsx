import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLayout from "./components/AdminLayout";
import ClientLayout from "./components/ClientLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./pages/admin/ProductForm";
import AuthForm from "./pages/AuthForm";
import CartPage from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";

function App() {
	return (
		<>
			<Routes>
				{/* Client */}
				<Route path="/" element={<ClientLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/product-detail/:id" element={<ProductDetail />} />
				</Route>

				{/* Admin */}
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="/admin/product-add" element={<ProductForm />} />
					<Route path="/admin/product-edit/:id" element={<ProductForm />} />
				</Route>

				<Route path="/login" element={<AuthForm isLogin />} />
				<Route path="/register" element={<AuthForm />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
