import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProducts() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost/Projects/ShoeStore-project/shoestore-backend/api/admin/admin-getCategory.php`)
    .then(res => res.json())
    .then(data => setCategories(data))
  },[]);
  // console.log(category);
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productCatg", category);
    formData.append("productOldPrice", oldPrice);
    formData.append("productNewPrice", newPrice);
    formData.append("productQty", quantity);
    formData.append("productDesc", description);
    formData.append("productImg", image);

    const catgRes = await fetch(`http://localhost/Projects/ShoeStore-project/shoestore-backend/api/admin/admin-addproduct.php`,
      {
        method : "POST",
        body : formData
      }
    );
    const catgSuccess = await catgRes.json();
    if(catgSuccess.status)
    {
      setProductName("");
      setCategory("");
      setOldPrice("");
      setNewPrice("");
      setQuantity("");
      setDescription("");
      setImage("");
    }
    console.log(catgSuccess);
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Add New Product
        </h2>

        <form className="space-y-6" onSubmit={handleAddProduct}>
          
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              onChange={(val) => setProductName(val.target.value)}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/*category  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(val) => setCategory(val.target.value)}
            >
              <option>Select Category</option>
              {
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
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
                onChange={(val) => setOldPrice(val.target.value)}
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
                onChange={(val) => setNewPrice(val.target.value)}
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
                onChange={(val) => setQuantity(val.target.value)}
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
              onChange={(val) => setDescription(val.target.value)}
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
              onChange={(val) => setImage(val.target.files[0])}
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
  );
}

export default AddProducts;