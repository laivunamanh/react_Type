import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { state, getDetail } = useContext(ProductContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id, getDetail]);

  const product = state.seletedProduct;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item) => item.id === product.id);

    if (index === -1) {
      cart.push({ ...product, quantity });
    } else {
      cart[index].quantity += quantity;
    }

    localStorage.setItem("cart", JSON.stringify(cart));


    setNotificationMessage("Sản phẩm đã được thêm vào giỏ hàng.");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      navigate("/cart");
    }, 2000);
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Chi Tiết Sản Phẩm</h1>
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
      <div className="row">
        <div className="col-md-6 mb-4">
          {product && (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid rounded"
            />
          )}
        </div>
        <div className="col-md-6">
          {product && (
            <>
              <h2 className="mb-3">{product.title}</h2>
              <p className="mb-4">{product.description}</p>
              <div className="d-flex align-items-center mb-3">
                <span className="h4 me-3">Giá sản phẩm:</span>
                <span className="h4 text-success">{product.price} VND</span>
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="form-label">
                  Số lượng
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="form-control"
                  min="1"
                />
              </div>
              <button
                className="btn btn-primary mt-3"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
