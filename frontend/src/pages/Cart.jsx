import { useEffect, useState } from "react";
import { BASE_URL } from "../api/baseURL";

function Cart() {
  const [cartData, setCartData] = useState(null);

  // fetch cart
  const fetchCart = () => {
    fetch(`${BASE_URL}/cart`)
      .then((res) => res.json())
      .then((data) => setCartData(data.data))
      .catch((err) => console.error("Error fetching cart:", err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // remove item
  const removeItem = (id) => {
    fetch(`${BASE_URL}/cart/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchCart()) // refresh cart
      .catch((err) => console.error("Error removing item:", err));
  };

  if (!cartData) return <p>Loading cart...</p>;

  return (
    <div>
      <h2>Your Cart</h2>

      {cartData.cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          {cartData.cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <h3>{item.productId.name}</h3>
              <p>Qty: {item.qty}</p>
              <p>Price: ${item.productId.price}</p>
              <button onClick={() => removeItem(item._id)}>Remove</button>
            </div>
          ))}

          <h3>Total: ${cartData.total}</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;
