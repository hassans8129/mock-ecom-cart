import { useEffect, useState } from "react";
import { BASE_URL } from "../api/baseURL";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch products on load
  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // add to cart function
  const addToCart = (productId) => {
    fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, qty: 1 }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Item added to cart!");
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
      });
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <h2>Products</h2>

      <div className="products-grid">
        {products.map((item) => (
          <div key={item._id} className="product-card">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => addToCart(item._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
