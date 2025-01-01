import React, { useEffect, useState } from 'react';
import API from '@/axios/api'; // Assuming your API for cart is set up
import { setAuthorizationToken } from '@/axios/instance';
import { toast } from 'react-toastify';

function Cart() {
    const [cartItems, setCartItems] = useState([]); // Cart items state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        setAuthorizationToken(user.token)
        console.log(user)
    }, [])
    // Fetch cart items from the API
    const fetchBookings = async () => {
        try {
            const response = await API.getAllOrders(); // Replace with your cart API endpoint
            console.log(response, ' order items');
            if (response.data) {
                setCartItems(response.data);
            }
        } catch (err) {
            //   setError('Failed to fetch cart items');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    // Fetch cart items when the component mounts
    React.useEffect(() => {
        fetchBookings();
    }, []);
    console.log(cartItems)
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
                    </div>
                </div>
            </nav>
            <div className='p-10'>
            <h1 className="text-3xl font-semibold text-gray-900 mb-8">Your Orders</h1>

            {/* Loop through the orders and display them */}
            <div className="space-y-8">
                {cartItems.map((order) => (
                    <div key={order.id} className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Order #{order.id}</h2>
                            {/* <span
                className={`text-sm px-4 py-2 rounded-full ${
                  order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                }`}
              >
                {order.status}
              </span> */}
                        </div>

                        {/* Order Items */}
                        <div className="space-y-4">
                            {order.items.length > 0 ? (
                                order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center border-b py-2">
                                        <div>
                                            <p className="text-gray-800 font-medium">{item.product.name}</p>
                                            <p className="text-sm text-gray-500">{item.product.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-600">x{item.dataValues.quantity}</p>
                                            <p className="text-gray-800 font-semibold">{item.dataValues.price * item.dataValues.quantity}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No items in this order.</p>
                            )}
                        </div>

                        {/* Order Total */}
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-lg font-semibold text-gray-800">Total</p>
                            <p className="text-xl font-bold text-gray-900">{order.total}</p>
                        </div>
                    </div>
                ))}
            </div>
            {cartItems.length === 0 && <div>No Orders </div>}
            </div>
        </div>
    );
}

export default Cart;
