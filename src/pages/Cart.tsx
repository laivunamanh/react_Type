import { Cart } from "../interfaces/Cart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState<Cart[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (isNaN(quantity) || quantity < 1) {
      setErrors((prev) => ({ ...prev, [id]: "Số lượng phải lớn hơn 0" }));
      return;
    }

    setErrors((prev) => ({ ...prev, [id]: "" })); // Xóa lỗi nếu nhập hợp lệ

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/bill");
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Giỏ Hàng</h2>
      <div className="d-flex justify-content-center">
        <table className="table table-striped table-bordered w-75">
          <thead>
            <tr>
              <th>Tên Sản Phẩm</th>
              <th>Hình Ảnh</th>
              <th>Số Lượng</th>
              <th>Giá Sản Phẩm</th>
              <th>Tổng Tiền</th>
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
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    min="1"
                    className="form-control text-center"
                    style={{ width: "80px", display: "inline-block" }}
                  />
                  {errors[item.id] && (
                    <div className="text-danger mt-1">{errors[item.id]}</div>
                  )}
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
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
