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
              
            </ul>
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
