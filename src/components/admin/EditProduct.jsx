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
        text : "",
    });
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/Projects/ShoeStore-project/shoestore-backend/api/admin/admin-getCategory.php`)
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.error(err));
    },[]);

    useEffect(() => {
        fetch(`http://localhost/Projects/ShoeStore-project/shoestore-backend/api/admin/admin-editproduct.php?id=${id}`)
            .then(res => res.json())
            .then(data => setEditData(data))
            .catch(err => console.error(err));
    },[id]);

    console.log(id);

    // handle change 
    const handleChange = (val) => {
        const {name, value} = val.target;
        setEditData({
            ...editData,
            [name]: value
        });
    }

    // handle update product 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const editRes = await fetch(
            `http://localhost/Projects/ShoeStore-project/shoestore-backend/api/admin/admin-editproduct.php?id=${id}`,
            {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(editData),
            }
        );
        const result = await editRes.json();
        if(result)
        {
            navigate(`/admin/dashboard`);
        }
        console.log(result);
    }
    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">

                    <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                        Edit Product
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter product name"
                                name='name'
                                value={editData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/*category  */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                name='category_id'
                                value={editData.category_id}
                                onChange={handleChange}
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
                                    name='old_price'
                                    value={editData.old_price}
                                    onChange={handleChange}
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
                                    name='new_price'
                                    value={editData.new_price}
                                    onChange={handleChange}
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
                                    name='quantity'
                                    value={editData.quantity}
                                    onChange={handleChange}
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
                                name='text'
                                value={editData.text}
                                onChange={handleChange}
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
                                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
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