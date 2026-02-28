import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
function Checkout() {
    // const  [params ] = useSearchParams();
    // const type = params.get("type");
    // const id = params.get("id");
    const { type, id } = useParams();
    const [checkoutData, setCheckoutData] = useState(null);
    
    
    const navigate = useNavigate();

    useEffect(() => {
        // if(!type || !id) return;
        fetch(`http://localhost/Projects/ShoeStore/shoestore-backend/api/checkout.php?type=${type}&id=${id}`, {credentials : "include"})
        .then(res => res.json())
        .then(data => setCheckoutData(data))
        .catch(err => console.error(err));
    },[type, id])

    if(checkoutData == null) return <p>Loading...</p>;

    const handlePlaceOrder = async () => {
        const orderRes = await fetch(
            `http://localhost/Projects/ShoeStore/shoestore-backend/api/place-order.php`,
            {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                credentials : "include",
                body : JSON.stringify({
                    product_id : checkoutData.product_id,
                    product_name : checkoutData.name,
                    product_quantity : checkoutData.quantity,
                    total : checkoutData.price * checkoutData.quantity,
                    payment_method : "Cash On Delivery."
                }),
            }
        );
        const orderData = await orderRes.json();
        if(orderData.status)
        {
            navigate(`/order-success/${orderData.order_id}`);
        }else{
            alert("Some thing wend wrong");
        }
        console.log(orderData);
    }
    // console.log(checkoutData);
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-6xl mx-auto px-4">

                {/* Page Title */}
                <h1 className="text-blue-600 text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left: Billing & Shipping */}
                <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Billing Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <textarea
                        placeholder="Full Address"
                        className="border p-3 rounded w-full mt-4 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select className="border p-3 rounded w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select City</option>
                    <option>Rawalpindi</option>
                    <option>Islamabad</option>
                    <option>Lahore</option>
                    <option>Karachi</option>
                    </select>

                    {/* Payment Method */}
                    <h2 className="text-lg font-semibold mt-8 mb-4">Payment Method</h2>

                    <div className="space-y-3">
                    <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                        <input type="radio" name="payment" className="accent-blue-500" />
                        <span>Cash on Delivery</span>
                    </label>
                    </div>
                </div>

                {/* Right Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                    <div className="flex justify-between mb-3">
                    <span>Name : {checkoutData.name}</span>
                    <span>Price : {checkoutData.price}</span>
                    </div>

                    <div className="flex justify-between mb-3">
                    <span>Quantity</span>
                    <span>{checkoutData.quantity}</span>
                    </div>

                    <div className="flex justify-between mb-3">
                    <span>Delivery Charges</span>
                    <span>Rs. 200</span>
                    </div>

                    <hr className="my-4" />

                    <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{(checkoutData.price * checkoutData.quantity + 200).toLocaleString()}</span>
                    </div>

                    <button 
                        onClick={handlePlaceOrder}
                        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold">
                        Place Order
                    </button>
                </div>

                </div>
            </div>
        </div>
    );
}
export default Checkout;
