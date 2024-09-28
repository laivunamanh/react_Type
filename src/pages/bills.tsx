import React, { useEffect, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

interface BillingDetails {
  fullName: string;
  address: string;
  phoneNumber: string;
  email: string;
}

const Bills = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    // Fetch cart and billing details from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const savedBillingDetails = JSON.parse(
      localStorage.getItem("billingDetails") || "{}"
    );

    setCart(savedCart);
    setBillingDetails(savedBillingDetails);
  }, []);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Chi Tiết Hóa Đơn</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Thông Tin Khách Hàng</h4>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              <strong>Họ và Tên:</strong> {billingDetails.fullName}
            </li>
            <li className="list-group-item">
              <strong>Địa Chỉ:</strong> {billingDetails.address}
            </li>
            <li className="list-group-item">
              <strong>Số Điện Thoại:</strong> {billingDetails.phoneNumber}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {billingDetails.email}
            </li>
          </ul>
        </div>

        <div className="col-md-6">
          <h4>Chi Tiết Đơn Hàng</h4>
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
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between mt-3">
            <strong>Tổng Cộng:</strong>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => window.print()}>
          In Hóa Đơn
        </button>
      </div>
    </div>
  );
};

export default Bills;
