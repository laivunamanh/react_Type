import { useContext, useEffect, useMemo, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { Product } from "../interfaces/Product";
import { Cart } from "../interfaces/Cart";
import { User } from "../interfaces/User";

const Home = () => {
  const { state } = useContext(ProductContext);
  const [user, setUser] = useState({} as User);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
  }, []);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item: Cart) => item.id === product.id);
    if (index === -1) {
      cart.push({ ...product, quantity: 1 });
    } else {
      cart[index].quantity += 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    setNotificationMessage("Sản phẩm đã được thêm vào giỏ hàng.");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const filteredProducts = useMemo(() => {
    return state.products.filter((product: Product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [state.products, searchTerm]);

  return (
    <div className="container mt-4">
      {/* Carousel Banner */}
      <div id="carouselExampleIndicators" className="carousel slide mb-4">
        <ol className="carousel-indicators">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://cdn.divineshop.vn/image/catalog/Anh-SP/Netflix/NETFLIX-1tuan%20(1)-76597.png?hash=1715588591"
              className="d-block w-100"
              alt="Banner 1"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Banner 1</h5>
              <p>Description for banner 1.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.divineshop.vn/image/catalog/Anh-SP/Kh%C3%A1c/ChatGPT%20TaiKhoan-78300.png?hash=1718253068"
              className="d-block w-100"
              alt="Banner 2"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Banner 2</h5>
              <p>Description for banner 2.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.divineshop.vn/image/catalog/Anh-SP/Youtube/YouTube%20Premium%20Music-1nam-65910.png?hash=1715587226"
              className="d-block w-100"
              alt="Banner 3"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Banner 3</h5>
              <p>Description for banner 3.</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="d-flex justify-content-end mb-4">
        <div className="input-group" style={{ maxWidth: "300px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Tên sản phẩm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => {}}>
            Search
          </button>
        </div>
      </div>

      {showNotification && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {notificationMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="row justify-content-center">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="col-md-3 d-flex justify-content-center mb-3"
          >
            <div
              className="card shadow-sm"
              style={{
                width: "18rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link to={`/product-detail/${item.id}`}>
                <div className="bd-placeholder-img card-img-top">
                  <img
                    className="card-img-top"
                    src={item.thumbnail}
                    alt={item.title}
                    focusable="false"
                  />
                </div>
              </Link>
              <div
                className="card-body d-flex flex-column"
                style={{ minHeight: "250px" }}
              >
                <h5 className="card-title">
                  <Link
                    to={`/product-detail/${item.id}`}
                    className="no-underline text-decoration"
                  >
                    {item.title}
                  </Link>
                </h5>
                <p className="card-text">${item.price}</p>
                <div className="mt-auto">
                  <button
                    className="btn btn-danger w-100"
                    onClick={
                      user?.email
                        ? () => addToCart(item)
                        : () => alert("Please login to add to cart")
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
