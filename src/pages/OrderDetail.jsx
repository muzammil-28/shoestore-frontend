import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function OrderDetail() {
    const { orderDetailId } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch(`http://localhost/Projects/ShoeStore/shoestore-backend/api/order-detail.php?order_id=${orderDetailId}`)
        .then(res => res.json())
        .then(data => setOrderDetail(data))
        .catch(err => console.error("Error found", err));
    },[orderDetailId]);

    if(!orderDetail)
    {
        return <p>Loading...</p>
    }

    // date
    const date = new Date(orderDetail.created_at);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", {month : "short"});
    const year = date.getFullYear();

    // total amount ka liye code
    const subTotal = Number(orderDetail.amount);
    const total = subTotal + 200;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">

                {/* Page Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h1>

                {/* Order Info */}
                <div className="mb-6">
                    <p className="text-gray-600">Order ID: <span className="font-semibold text-blue-600">#{orderDetailId}</span></p>
                    <p className="text-gray-600">Order Date: <span className="font-semibold">{day}/{month}/{year}</span></p>
                    <p className="text-gray-600">Status: <span className="font-semibold text-green-600">{Number(orderDetail.status) === 0 ? "Pending" : "Success"}</span></p>
                </div>

                {/* Product List */}
                <div className="space-y-4">

                    {/* Single Product Item */}
                    <div className="flex items-center justify-between border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center gap-4">
                            <img src={`http://localhost/Projects/ShoeStore/shoestore-backend/uploads/image/${orderDetail.image}`} alt="Product" className="w-16 h-16 rounded" />
                            <div>
                                <p className="font-semibold text-gray-800">{orderDetail.name}</p>
                                <p className="text-gray-600">Quantity: {orderDetail.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold text-gray-800">Rs. {orderDetail.amount}</p>
                    </div>

                    {/* Repeat similar block for each product */}

                </div>

                {/* Delivery charges */}
                <div className="flex justify-between mt-6 p-4 border-t border-gray-200 font-bold text-lg">
                    <span>Delivery Charges</span>
                    <span>Rs. 200</span>
                </div>
                {/* Total Amount */}
                <div className="flex justify-between mt-6 p-4 border-t border-gray-200 font-bold text-lg">
                    <span>Total</span>
                    <span>Rs. {(total).toLocaleString()}</span>
                </div>

                {/* Back Button */}
                <div className="mt-6">
                    <button onClick={() => navigate(`/order-success/${orderDetailId}`)} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                        Back to Orders
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail