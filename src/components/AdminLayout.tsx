import { Link, Outlet } from "react-router-dom";


const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user || user.role !== "admin") {
    return (
      <div className="container text-center mt-5">
        <h1 className="mb-4">Bạn không có quyền vào trang này!</h1>
        <Link to="/" className="btn btn-primary">
          Quay lại trang mua sắm!
        </Link>
      </div>
    );
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  <i className="bi bi-cart"></i> Xem giỏ hàng
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <header className="bg-dark text-white py-3 mb-4">
          <div className="container">
            <h1 className="mb- md-2">Xin Chào Admin: {user.email}</h1>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/product-add" className="nav-link">
                    Thêm Sản Phẩm
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/list" className="nav-link">
                    Quản lý tài khoản
                  </Link>
                </li>
              </ul>
            </nav>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
