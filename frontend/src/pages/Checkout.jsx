import { useState, useEffect } from "react";
import { BASE_URL } from "../api/baseURL";

export default function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [receipt, setReceipt] = useState(null);

  // get cart items first (so we know what we are checking out)
  useEffect(() => {
    fetch(`${BASE_URL}/cart`)
      .then((res) => res.json())
      .then((data) => {
        const adjusted = data.data.cartItems.map((item) => ({
          productId: item.productId._id,
          qty: item.qty,
        }));
        setCartItems(adjusted);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const handleCheckout = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems, name, email }),
    })
      .then((res) => res.json())
      .then((data) => setReceipt(data.data))
      .catch((err) => console.error("Error in checkout:", err));
  };

  return (
    <div>
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <form onSubmit={handleCheckout}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ display: "block", marginBottom: "10px" }}
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: "block", marginBottom: "10px" }}
            />

            <button type="submit">Checkout</button>
          </form>

          {receipt && (
            <div className="receipt-box">
              <h3>Receipt</h3>
              <p>
                <strong>Total:</strong> ${receipt.total}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(receipt.timestamp).toLocaleString()}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
