
import { useState } from "react";
import {
  Search, ShoppingBag, Menu, Heart, ArrowUpRight,
  Sparkles, Plus
} from "lucide-react";
import "./index.css";

const products = [
  { id: 1, name: "Midnight Drive", category: "Aesthetic", price: 249, image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=700" },
  { id: 2, name: "Lost in Music", category: "Music", price: 299, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700" },
  { id: 3, name: "Vintage Soul", category: "Vintage", price: 199, image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=700" },
  { id: 4, name: "Dark Aesthetic", category: "Aesthetic", price: 249, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700" },
  { id: 5, name: "Cinema Forever", category: "Movie", price: 299, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700" },
  { id: 6, name: "Beyond Reality", category: "Anime", price: 249, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700" },
];

const categories = ["All", "Aesthetic", "Music", "Movie", "Anime", "Vintage"];

function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
const [showCheckout, setShowCheckout] = useState(false);

const [customer, setCustomer] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: ""
});

const [orderPlaced, setOrderPlaced] = useState(false);
const cartSubtotal = cart.reduce(
  (total, item) =>
    total + (item.finalPrice || item.price) * (item.quantity || 1),
  0
);

const shipping = cartSubtotal >= 999 || cart.length === 0 ? 0 : 79;
const grandTotal = cartSubtotal + shipping;
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
const [selectedSize, setSelectedSize] = useState("A4");
const [framed, setFramed] = useState(false);

const finalPrice = selectedProduct
  ? selectedProduct.price +
    (selectedSize === "A3" ? 150 : 0) +
    (framed ? 200 : 0)
  : 0;

const addConfiguredProduct = () => {
  setCart((prev) => [
    ...prev,
    {
      ...selectedProduct,
      size: selectedSize,
      framed,
      finalPrice,
      cartId: Date.now()
    }
  ]);
  setSelectedProduct(null);
};

  const filteredProducts = category === "All"
    ? products
    : products.filter((p) => p.category === category);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="app">
      <div className="announcement">
        FREE SHIPPING ON ORDERS ABOVE ₹999 ✦ MADE FOR YOUR WALLS
      </div>

      <header className="navbar">
        <button className="mobile-menu" aria-label="Menu"><Menu /></button>
        <a className="logo" href="#home">
          HANGOUT<span>POSTER STUDIO</span>
        </a>

        <nav>
          <a href="#home">HOME</a>
          <a href="#shop">SHOP</a>
          <a href="#collections">COLLECTIONS</a>
          <a href="#custom">CUSTOM FRAMES</a>
        </nav>

        <div className="nav-actions">
          <button aria-label="Search"><Search /></button>
          <button aria-label="Favorites" onClick={() => document.getElementById("shop").scrollIntoView()}>
            <Heart />
          </button>
         <button
  className="cart-button"
  aria-label="Cart"
  onClick={() => setShowCart(true)}
>
  <ShoppingBag />
  <span>{cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}</span>
</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow"><Sparkles size={15} /> ART THAT SPEAKS</p>
            <h1>YOUR WALLS.<br />YOUR <span>VIBE.</span></h1>
            <p className="hero-description">
              Turn empty spaces into something unforgettable.
              Discover posters that tell your story.
            </p>
            <a href="#shop" className="primary-button">
              EXPLORE COLLECTION <ArrowUpRight size={18} />
            </a>
            <div className="hero-note">DESIGNED TO INSPIRE. MADE TO BELONG.</div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200"
              alt="Aesthetic modern wall interior"
            />
            <div className="image-label">THE ART OF YOUR SPACE — 01</div>
          </div>
          <div className="hero-number">01 / 06</div>
        </section>

        <section className="categories section" id="collections">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIND YOUR STYLE</p>
              <h2>EXPLORE <span>COLLECTIONS</span></h2>
            </div>
            <p className="muted">A collection for every mood.</p>
          </div>
          <div className="category-grid">
            {[
              ["AESTHETIC", "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600"],
              ["MUSIC", "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600"],
              ["VINTAGE", "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600"],
              ["CINEMA", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600"]
            ].map(([name, image]) => (
              <button className="category-card" key={name}
                onClick={() => {
                  setCategory(name === "CINEMA" ? "Movie" : name[0] + name.slice(1).toLowerCase());
                  document.getElementById("shop").scrollIntoView();
                }}>
                <img src={image} alt={name} />
                <span>{name} <ArrowUpRight size={18} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="shop section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE HANGOUT EDIT</p>
              <h2>POSTERS THAT <span>HIT DIFFERENT.</span></h2>
            </div>
            <p className="muted">Find the art that feels like you.</p>
          </div>

          <div className="filter-list">
            {categories.map((item) => (
              <button key={item}
                className={category === item ? "filter active" : "filter"}
                onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
           
<button
  className="quick-add"
  onClick={() => {
    setCart((prev) => [
      ...prev,
      {
        ...product,
        size: "A4",
        framed: false,
        finalPrice: product.price,
        cartId: Date.now()
      }
    ]);
  }}
>
  <Plus size={16} /> ADD TO BAG
</button>

<button
  className="view-details"
  onClick={() => {
    setSelectedProduct(product);
    setSelectedSize("A4");
    setFramed(false);
  }}
>
  VIEW DETAILS
</button>



                </div>
                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.category} Collection</p>
                  </div>
                  <strong>₹{product.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
{selectedProduct && (
  <div className="modal-overlay">
    <div className="product-modal">
      <button
        className="modal-close"
        onClick={() => setSelectedProduct(null)}
      >✕</button>

      <div className="modal-image">
        <img src={selectedProduct.image} alt={selectedProduct.name} />
      </div>

      <div className="modal-info">
        <p className="eyebrow">HANGOUT COLLECTION</p>
        <h2>{selectedProduct.name}</h2>
        <p className="modal-description">
          Bring your walls to life with this beautiful
          HANGOUT poster.
        </p>

        <h4>SELECT SIZE</h4>
        <div className="option-buttons">
          {["A4", "A3"].map((size) => (
            <button
              key={size}
              className={selectedSize === size ? "option active" : "option"}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <h4>FRAME OPTION</h4>
        <div className="option-buttons">
          <button
            className={!framed ? "option active" : "option"}
            onClick={() => setFramed(false)}
          >
            Unframed
          </button>
          <button
            className={framed ? "option active" : "option"}
            onClick={() => setFramed(true)}
          >
            Framed
          </button>
        </div>

        <div className="modal-price">
          <span>TOTAL PRICE</span>
          <strong>₹{finalPrice}</strong>
        </div>

        <button className="modal-add" onClick={addConfiguredProduct}>
          ADD TO CART — ₹{finalPrice}
        </button>
      </div>
    </div>
  </div>
)}
        <section className="custom-section" id="custom">
          
          <div className="custom-image">
            <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000"
              alt="Beautiful framed wall art" />
          </div>
          <div className="custom-content">
            <p className="eyebrow"><Sparkles size={15} /> MADE PERSONAL</p>
            <h2>YOUR PHOTO.<br />YOUR <span>FRAME.</span></h2>
            <p>
              Some memories deserve more than a place in your gallery.
              Turn your favourite photographs into beautiful wall frames.
            </p>
            <a href="#custom" className="primary-button">
              CREATE YOUR FRAME <ArrowUpRight size={18} />
            </a>
            <small>YOUR MEMORIES, BEAUTIFULLY FRAMED.</small>
          </div>
        </section>

        <section className="brand-message">
          <p className="eyebrow">MORE THAN JUST POSTERS</p>
          <h2>MAKE SPACE FOR <span>YOURSELF.</span></h2>
          <p>Good art. Good energy. Your kind of space.</p>
        </section>
      </main>

{showCart && (
  <div className="cart-overlay">
    <div className="cart-panel">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR HANGOUT BAG</p>
          <h2>SHOPPING CART</h2>
        </div>
        <button onClick={() => setShowCart(false)}>✕</button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={45} />
          <h3>Your bag is empty</h3>
          <p>Find something beautiful for your walls.</p>
          <button onClick={() => setShowCart(false)}>
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.cartId}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.size || "A4"} · {item.framed ? "Framed" : "Unframed"}</p>
                  <strong>₹{item.finalPrice || item.price}</strong>

                  <div className="quantity-control">
                    <button onClick={() =>
                      setCart(prev => prev.map(x =>
                        x.cartId === item.cartId
                          ? {...x, quantity: Math.max(1, (x.quantity || 1) - 1)}
                          : x
                      ))
                    }>−</button>

                    <span>{item.quantity || 1}</span>

                    <button onClick={() =>
                      setCart(prev => prev.map(x =>
                        x.cartId === item.cartId
                          ? {...x, quantity: (x.quantity || 1) + 1}
                          : x
                      ))
                    }>+</button>
                  </div>
                </div>

                <button
                  className="remove-item"
                  onClick={() => setCart(prev =>
                    prev.filter(x => x.cartId !== item.cartId)
                  )}
                >
                  REMOVE
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p>Subtotal <strong>₹{cartSubtotal}</strong></p>
            <p>Shipping <strong>{shipping === 0 ? "FREE" : `₹${shipping}`}</strong></p>
            <div className="cart-total">
              <span>TOTAL</span>
              <strong>₹{grandTotal}</strong>
            </div>
          <button
  className="checkout-button"
  onClick={() => {
    setShowCart(false);
    setShowCheckout(true);
  }}
>
  PROCEED TO CHECKOUT →
</button>
          </div>
        </>
      )}
    </div>
  </div>
)}


      {showCheckout && (
        <div className="checkout-overlay">
          <div className="checkout-container">
            <div className="checkout-header">
              <div>
                <p className="eyebrow">HANGOUT POSTER STUDIO</p>
                <h2>CHECKOUT</h2>
              </div>
              <button
                type="button"
                className="checkout-close"
                aria-label="Close checkout"
                onClick={() => setShowCheckout(false)}
              >
                ✕
              </button>
            </div>

            {orderPlaced ? (
              <div className="order-success">
                <div className="success-icon">✓</div>
                <p className="eyebrow">HANGOUT POSTER STUDIO</p>
                <h2>ORDER PLACED!</h2>
                <p>Your demo order has been completed successfully.</p>
                <p className="checkout-note">
                  This is a frontend demo. No payment was collected and the order
                  has not been saved to a database.
                </p>
                <button
                  type="button"
                  className="place-order-button"
                  onClick={() => {
                    setOrderPlaced(false);
                    setShowCheckout(false);
                  }}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <form
                className="checkout-grid"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (cart.length === 0) return;
                  setOrderPlaced(true);
                  setCart([]);
                }}
              >
                <div className="customer-details">
                  <p className="eyebrow">01 — DELIVERY</p>
                  <h3>YOUR DETAILS</h3>

                  <label htmlFor="checkout-name">Full name</label>
                  <input
                    id="checkout-name"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    value={customer.name}
                    onChange={(event) =>
                      setCustomer({ ...customer, name: event.target.value })
                    }
                    required
                  />

                  <label htmlFor="checkout-email">Email address</label>
                  <input
                    id="checkout-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={customer.email}
                    onChange={(event) =>
                      setCustomer({ ...customer, email: event.target.value })
                    }
                    required
                  />

                  <label htmlFor="checkout-phone">Mobile number</label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={customer.phone}
                    onChange={(event) =>
                      setCustomer({
                        ...customer,
                        phone: event.target.value.replace(/\D/g, "").slice(0, 10)
                      })
                    }
                    required
                  />

                  <label htmlFor="checkout-address">House / street address</label>
                  <textarea
                    id="checkout-address"
                    placeholder="House name, street, area"
                    autoComplete="street-address"
                    rows={3}
                    value={customer.address}
                    onChange={(event) =>
                      setCustomer({ ...customer, address: event.target.value })
                    }
                    required
                  />

                  <div className="checkout-two-columns">
                    <div>
                      <label htmlFor="checkout-city">City</label>
                      <input
                        id="checkout-city"
                        type="text"
                        placeholder="City"
                        autoComplete="address-level2"
                        value={customer.city}
                        onChange={(event) =>
                          setCustomer({ ...customer, city: event.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="checkout-state">State</label>
                      <input
                        id="checkout-state"
                        type="text"
                        placeholder="State"
                        autoComplete="address-level1"
                        value={customer.state}
                        onChange={(event) =>
                          setCustomer({ ...customer, state: event.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <label htmlFor="checkout-pincode">PIN code</label>
                  <input
                    id="checkout-pincode"
                    type="text"
                    placeholder="6-digit PIN code"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={customer.pincode}
                    onChange={(event) =>
                      setCustomer({
                        ...customer,
                        pincode: event.target.value.replace(/\D/g, "").slice(0, 6)
                      })
                    }
                    required
                  />

                  <button
                    type="submit"
                    className="place-order-button"
                    disabled={cart.length === 0}
                  >
                    PLACE DEMO ORDER — ₹{grandTotal}
                  </button>
                  <p className="checkout-note">
                    Demo checkout only. No payment will be collected.
                  </p>
                </div>

                <aside className="checkout-summary">
                  <p className="eyebrow">02 — SUMMARY</p>
                  <h3>YOUR ORDER</h3>

                  {cart.map((item) => (
                    <div className="checkout-product" key={item.cartId}>
                      <img src={item.image} alt={item.name} />
                      <div className="checkout-product-info">
                        <strong>{item.name}</strong>
                        <p>
                          {item.size || "A4"} · {item.framed ? "Framed" : "Unframed"}
                        </p>
                        <p>Quantity: {item.quantity || 1}</p>
                      </div>
                      <strong className="checkout-product-price">
                        ₹{(item.finalPrice || item.price) * (item.quantity || 1)}
                      </strong>
                    </div>
                  ))}

                  <div className="checkout-total">
                    <p>
                      Subtotal <strong>₹{cartSubtotal}</strong>
                    </p>
                    <p>
                      Shipping <strong>{shipping === 0 ? "FREE" : `₹${shipping}`}</strong>
                    </p>
                    <h3>
                      TOTAL <strong>₹{grandTotal}</strong>
                    </h3>
                  </div>
                </aside>
              </form>
            )}
          </div>
        </div>
      )}

      <footer>
        <div className="footer-main">
          <a className="logo" href="#home">HANGOUT<span>POSTER STUDIO</span></a>
          <p>ART THAT FEELS LIKE YOU.</p>
          <a href="#home"><span>◎</span> FOLLOW OUR WORLD</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 HANGOUT POSTER STUDIO</span>
          <span>MADE WITH LOVE FOR YOUR WALLS.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
