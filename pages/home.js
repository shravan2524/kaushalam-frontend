import React, { useEffect, useState } from 'react';
import API from '@/axios/api'; // Ensure your API is set up correctly
import { setAuthorizationToken } from '@/axios/instance';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]); // Cart state
  const router = useRouter();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setAuthorizationToken(user.token)
    console.log(user)
  }, [])
  

  useEffect(() => {
    // Fetch product data from the API
    const fetchProducts = async () => {
      try {
        const response = await API.getProducts(); // Replace with your actual API URL
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to add product to the cart
  const addToCart = async (product) => {
    try {
      const response = await API.addToCart({productId:product._id}); // Replace with your API endpoint
      setCart([...cart, response.data]); // Add the product to cart state
      toast.success('Product added in cart');
    } catch (err) {
    //   setError('Failed to add product to cart');
      console.error(err);
    }
  };

  // Function to handle the purchase
  const handlePurchase = async (product) => {
    console.log(product._id)
    try {
      const response = await API.placeOrderDirect({productId:product._id, quantity:1}); // Replace with your API endpoint for purchasing
    //   alert('Purchase successful!'); // Provide feedback to the user
      setCart([]); // Empty the cart after purchase
      toast.success('Product Purchase successful!');
    } catch (err) {
    //   setError('Failed to complete purchase');
      console.error(err);
    }
  };
  const logout = () => {
    localStorage.removeItem('user')
    router.push("/login")

  }

  if (loading) return <div className="text-center p-4">Loading products...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

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

      {/* Product Section */}
      <main className="flex-grow bg-gray-50 py-8 px-4" id="products">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
              >
                {product.image ? (
                  <img
                    src={product.image} // For Base64 image data
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <p className="text-lg font-semibold text-gray-900">Price: ${product.price}</p>
                  {/* <p className="text-gray-600">Stock: {product.stock}</p> */}
                  {/* Add to Cart and Buy buttons */}
                  <div className="mt-4 space-x-4">
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handlePurchase(product)}
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Cart Summary */}
      {/* {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">Items in Cart: {cart.length}</p>
          <button
            onClick={() => router.push('cart')}
            className="bg-green-600 text-white py-2 px-4 mt-2 rounded-lg hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      )} */}

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 Product Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
