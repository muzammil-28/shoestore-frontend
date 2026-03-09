import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function EditProduct() {
    const { id } = useParams();
    const [editData, setEditData] = useState({
        name : "",
        category_id : "",
        new_price : "",
        old_price : "",
        quantity : "",
        text : ""
    });
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/Projects/ShoeStore-project/shoestore-backend/api/admin/admin-getCategory.php`)
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.error(err));
    },[]);

    // console.log(id);

    useEffect(() => {
        fetch(`http://localhost/Projects/ShoeStore-project/shoestore-backend/api/admin/admin-editproduct.php?id=${id}`)
        .then(res => res.json())
        .then(data => setEditData(data))
        .catch(err => console.error(err));
    },[id]);
    console.log(editData);
    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">

                    <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                        Edit Product
                    </h2>

                    <form className="space-y-6">

                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter product name"
                                value={editData.name}
                                onChange={(val) => setEditData({...editData, name:val.targer.value})}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/*category  */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={editData.category_id}
                                onChange={(val) => setEditData({...editData, category_id:val.target.value})}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Select Category</option>
                                {
                                    categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.title}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {/* Price & Stock */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Old Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter price"
                                    value={editData.old_price}
                                    onChange={(val) => setEditData({...editData, old_price:val.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter price"
                                    value={editData.new_price}
                                    onChange={(val) => setEditData({...editData, new_price:val.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter stock quantity"
                                    value={editData.quantity}
                                    onChange={(val) => setEditData({...editData, quantity:val.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Enter product description"
                                value={editData.text}
                                onChange={(val) => setEditData({...editData, text:val.target.value})}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Image
                            </label>
                            <input
                                type="file"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="reset"
                                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => navigate(`/admin/dashboard`)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Add Product
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct