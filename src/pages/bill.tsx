import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

const BillPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const [billingDetails, setBillingDetails] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  };

  const handleQuantityChange = (id: number, increment: boolean) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: increment
              ? item.quantity + 1
              : item.quantity > 1
              ? item.quantity - 1
              : 1,
          }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage with the new quantity
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store billing details and cart data for the invoice page
    localStorage.setItem("billingDetails", JSON.stringify(billingDetails));

    // Navigate to the invoice page
    navigate("/bills");
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Hóa Đơn Thanh Toán</h2>
      <div className="row">
        <div className="col-md-7">
          <h4>Thông Tin Khách Hàng</h4>
          <form onSubmit={handleSubmit} className="p-4 border rounded">
            <div className="mb-3">
              <label className="form-label">Họ và Tên</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={billingDetails.fullName}
                onChange={handleInputChange}
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Địa Chỉ</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={billingDetails.address}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số Điện Thoại</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={billingDetails.phoneNumber}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
                placeholder="Nhập email"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Hoàn Tất Thanh Toán
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <h4>Chi Tiết Đơn Hàng</h4>
          <div className="p-3 border rounded">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Sản Phẩm</th>
                  <th>Số Lượng</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-secondary btn-sm me-2"
                          onClick={() => handleQuantityChange(item.id, false)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-secondary btn-sm ms-2"
                          onClick={() => handleQuantityChange(item.id, true)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between mt-3">
              <strong>Tổng Cộng:</strong>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="mt-3">
              <button
                className="btn btn-secondary w-100"
                onClick={() => navigate("/cart")}
              >
                Quay Lại Giỏ Hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPage;
