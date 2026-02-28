import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Cart() {
    const [cartProducts, setCartproducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://shoesstore.infinityfreeapp.com/shoestore-backend/api/cart-products.php`, { credentials: "include" })
            .then(res => res.json())
            .then(data => setCartproducts(data))
            .catch(err => console.error(err));
    }, []);
    // console.log(cartProducts);

    // handle delete
    const handleDelete = async (cartId) => {
        const DeleteRes = await fetch(
            `https://shoesstore.infinityfreeapp.com/shoestore-backend/api/delete-cart-products.php`,
            {
                method: "POST",
                headers : {"Content-Type" : "application/json"},
                credentials : "include",
                body : JSON.stringify({
                    cart_id : cartId,
                }),
            }
        )

        const DeleteData = await DeleteRes.json();

        if(DeleteData.status)
        {
            setCartproducts(
                prev => prev.filter(item => item.id !== cartId)
            );
        }else{
            alert(DeleteData.message);
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-10">

            {/* Cart Title */}
            <h1 className="text-3xl font-bold text-blue-600 mb-6">My Cart</h1>

            {/* Cart Container */}
            <div className="bg-white rounded-lg shadow p-6">

                {/* Single Cart Item */}

                {
                    cartProducts.map((product, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 border-b pb-4 mb-4">

                            {/* Product Image */}
                            <img
                                src={`https://shoesstore.infinityfreeapp.com/shoestore-backend/uploads/image/${product.image}`}
                                alt="product"
                                className="w-24 h-24 object-cover rounded"
                            />

                            {/* Product Info */}
                            <div className="flex-1">
                                <h2 className="font-semibold text-lg">{product.name}</h2>

                                <p className="text-sm text-gray-500">Size: All</p>

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-3">

                                    {/* Quantity */}
                                    <div className="flex items-center gap-3">
                                        <button className="px-3 py-1 bg-gray-200 rounded">
                                            -
                                        </button>

                                        <span className="px-3 py-1 border rounded">
                                            {product.quantity}
                                        </span>

                                        <button className="px-3 py-1 bg-gray-200 rounded">
                                            +
                                        </button>
                                    </div>

                                    {/* Price */}
                                    <p className="font-bold text-gray-800">Rs. {product.price}</p>
                                </div>

                                {/* Checkout Button (Per Product) */}
                                <button onClick={() => navigate(`/checkout/cart/${product.id}`)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold cursor-pointer">
                                    Checkout
                                </button>
                            </div>

                            {/* Remove */}
                            <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 text-xl self-start cursor-pointer">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>

                        </div>
                    ))
                }
            </div>

        </div>
    );
}

export default Cart;