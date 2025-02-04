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
  const [rating, setRating] = useState(0); // Store the current rating
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false); // Track if data has been loaded

  useEffect(() => {
    if (id && !dataLoaded) {
      // Only fetch if data is not already loaded
      getDetail(id);
      setDataLoaded(true); // Mark as loaded
    }
  }, [id, getDetail, dataLoaded]);

  useEffect(() => {
    if (dataLoaded) {
      // Load comments and ratings from localStorage only once
      const storedComments = JSON.parse(
        localStorage.getItem("comments") || "[]"
      );
      const storedRating = parseInt(localStorage.getItem("rating") || "0");

      setComments(storedComments);
      setRating(storedRating);
    }
  }, [dataLoaded]); // Trigger this effect only when data is loaded

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
    }, 2000);
  };

  const handleBuyNow = () => {
    // Add the product to the cart and then redirect to the cart page
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item) => item.id === product.id);

    if (index === -1) {
      cart.push({ ...product, quantity });
    } else {
      cart[index].quantity += quantity;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect to the cart page or checkout page
    navigate("/cart"); // Assuming the cart page route is "/cart"
  };

  const handleCommentSubmit = () => {
    if (comment.trim() === "") return;

    const newComment = {
      username: "User", // In a real scenario, get the username from logged-in user
      text: comment,
      date: new Date().toLocaleString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));

    setComment(""); // Clear comment input
  };

  const handleRatingChange = (rate: number) => {
    setRating(rate);
    localStorage.setItem("rating", rate.toString()); // Save rating to localStorage
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
              width={400}
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
              <div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  className="btn btn-success mt-3 ms-3"
                  onClick={handleBuyNow}
                >
                  Mua ngay
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Rating Section */}
      <div className="mt-5">
        <h3>Đánh giá sản phẩm</h3>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`fa fa-star ${
                star <= rating ? "text-warning" : "text-muted"
              }`}
              onClick={() => handleRatingChange(star)}
              style={{ cursor: "pointer", fontSize: "24px" }}
            ></span>
          ))}
        </div>
        <p className="mt-2">Bạn đánh giá sản phẩm: {rating} sao</p>
      </div>

      {/* Comments Section */}
      <div className="mt-5">
        <h3>Bình luận</h3>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
          />
        </div>
        <button className="btn btn-primary" onClick={handleCommentSubmit}>
          Gửi bình luận
        </button>

        <div className="mt-4">
          <h4>Các bình luận:</h4>
          {comments.length === 0 ? (
            <p>Chưa có bình luận nào.</p>
          ) : (
            <ul className="list-unstyled">
              {comments.map((comment, index) => (
                <li key={index} className="mb-3">
                  <strong>{comment.username}</strong> - {comment.date}
                  <p>{comment.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
