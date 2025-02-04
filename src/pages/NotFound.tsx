import { Link } from "react-router-dom";

const NotFound = () => {
	return (
    <div className="card-title text-center">
      <h1>404</h1>
	<samp>Lỗi không có trang này, mời quay lại!</samp><br></br>
      <Link to="/" className="btn btn-primary">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
