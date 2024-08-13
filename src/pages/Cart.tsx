import { Cart } from "../interfaces/Cart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState<Cart[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setAlertMessage("Sản phẩm đã được xóa khỏi giỏ hàng.");
    setShowAlert(true);

    setTimeout(() => setShowAlert(false), 3000);
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setAlertMessage("Thanh toán thành công! Đang vào thanh toán.");
    setShowAlert(true);

    // Clear the cart after successful checkout
    setCart([]);
    localStorage.removeItem("cart");

    setTimeout(() => {
      setShowAlert(false);
      navigate("/checkout");
    }, 3000); // Delay navigation by 3 seconds
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Giỏ Hàng</h2>
      {showAlert && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="d-flex justify-content-center">
        <table className="table table-striped table-bordered w-75">
          <thead>
            <tr>
              <th>Tên Sản Phẩm</th>
              <th>Hình Ảnh</th>
              <th>Số Lượng</th>
              <th>Giá Sản Phẩm</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="img-fluid"
                  />
                </td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {cart.length > 0 && (
        <div className="alert alert-info mt-4 mx-auto w-75">
          <h4 className="alert-heading">Tổng Số tiền</h4>
          <p className="mb-0">${totalAmount.toFixed(2)}</p>
          <button className="btn btn-success mt-3" onClick={handleCheckout}>
            Thanh Toán
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
