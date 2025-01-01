import React, { useEffect, useState } from 'react';
import API from '@/axios/api'; // Assuming your API for cart is set up
import { setAuthorizationToken } from '@/axios/instance';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function Cart() {
  const [cartItems, setCartItems] = useState([]); // Cart items state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setAuthorizationToken(user.token)
    console.log(user)
  }, [])
  // Fetch cart items from the API
  const fetchCartItems = async () => {
    try {
      const response = await API.getCart(); // Replace with your cart API endpoint
      console.log(response, 'cart items');
      if(response.data.items){
      setCartItems(response.data.items);
      }
    } catch (err) {
    //   setError('Failed to fetch cart items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from the cart
  const removeFromCart = async (productId) => {
    try {
      await API.removeFromCart(productId); // Replace with your remove cart item API
    //   setCartItems(cartItems.filter(item => item._id !== productId)); // Update cart state
      fetchCartItems()
      toast.success('Product removed from cart');
    } catch (err) {
    //   setError('Failed to remove product');
      console.error(err.error);
    }
    
  };
  const logout = () => {
    localStorage.removeItem('user')
    router.push("/login")

  }
  // Proceed to checkout
  const checkout = async () => {
    try {
      const response = await API.checkoutCart(); // Replace with your checkout API
    //   alert('Checkout successful!');
      setCartItems([]); // Clear the cart after successful checkout
    //   alert('Purchase successful!'); 
    console.log(response)
      toast.success('Product Purchase successful!');
      router.push("/orders")
    } catch (err) {
    //   setError('Failed to proceed with checkout');
      console.error(err);
    }
  };

  // Fetch cart items when the component mounts
  React.useEffect(() => {
    fetchCartItems();
  }, []);
  console.log(cartItems, 'cartItemscartItems')

  if (loading) return <div className="text-center p-4">Loading cart...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  const totalAmount = cartItems ? cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0) : 0;
//   const totalAmount = 123

  return (
    <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Product Dashboard</h1>
                <div className="space-x-4">
                    <a href="/home" className="text-white">Home</a>
                    <a href="/orders" className="text-white">Orders</a>
                    <a href="/cart" className="text-white">Cart</a>
                    <a onClick={logout} className="text-white">Logout</a>
                </div>
            </div>
        </nav>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">Your Cart</h2>
        {/* Cart Items */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          {cartItems && cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty</p>
          ) : (
            <div>
              {cartItems && cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between border-b border-gray-200 py-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.productId.name}</h3>
                      <p className="text-sm text-gray-600">{item.productId.description}</p>
                      <p className="text-gray-900">Price: {item.productId.price}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold text-green-600">${totalAmount.toFixed(2)}</span>
          </div>

         {cartItems.length>=0 && <button
            onClick={checkout}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Checkout
          </button>}
        </div>
      </div>
    </div>
  );
}

export default Cart;
