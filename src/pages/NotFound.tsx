import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div>
			<h1>404</h1>
			<Link to="/" className="btn btn-primary">
				Go back home
			</Link>
		</div>
	);
};

export default NotFound;
