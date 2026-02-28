import { useNavigate, useParams } from 'react-router-dom'

function OrderSuccess() {
    const navigate = useNavigate();
    const { orderId } = useParams();
    // console.log(orderId);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg text-center">
                
                {/* Success Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed</h1>

                {/* Message */}
                <p className="text-gray-600 mb-4">Thank you for your purchase! Your order has been placed successfully.</p>

                {/* Order ID */}
                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="text-lg font-semibold text-blue-600">#{orderId}</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => navigate("/")}
                        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                        Continue Shopping
                    </button>

                    <button onClick={() => navigate(`/order-detail/${orderId}`)} className="border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition">
                        View Order Details
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess