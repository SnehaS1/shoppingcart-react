import React, {useState} from 'react';
import formatCurrency from "../util";


function Cart(props) {
    const [showCheckout, setShowCheckout]= useState(false);
    const [allValues, setAllValues] = useState({
        name: "",
        email: "",
        address: ""
     });
    const { cartItems } = props;
    console.log(showCheckout);
    const handleInput = (e) => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
      };
     const createOrder = (e) => {
        e.preventDefault();
        const {name, email, address} = allValues;
        const order = {
          name,
          email,
          address,
          cartItems
        };
        console.log(order);
        props.createOrder(order);
      };
      return (
        <div>
          {cartItems.length === 0 ? (
            <div className="cart cart-header">Cart is empty</div>
          ) : (
            <div className="cart cart-header">
              You have {cartItems.length} in the cart{" "}
            </div>
          )}
          <div>
            <div className="cart">
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count}{" "}
                        <button
                          className="button"
                          onClick={() => props.removeFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {cartItems.length !== 0 && (
              <div>
                <div className="cart">
                  <div className="total">
                    <div>
                      Total:{" "}
                      {formatCurrency(
                        cartItems.reduce((a, c) => a + c.price * c.count, 0)
                      )}
                    </div>
                    <button
                      onClick={() =>  setShowCheckout(value => !value)}
                      className="button primary"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
                {showCheckout && (
                  <div className="cart">
                    <form onSubmit={createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input
                            name="email"
                            type="email"
                            required
                            onChange={handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            name="address"
                            type="text"
                            required
                            onChange={handleInput}
                          ></input>
                        </li>
                        <li>
                          <button className="button primary" type="submit">
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
}

export default Cart
