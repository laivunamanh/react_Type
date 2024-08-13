import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const ClientLayout = () => {
	return (
		<>
			<Header />
			<div className="container">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default ClientLayout;
