import { useState, useEffect } from "react";
import Sidebar from "../../components/admin/AdminSidebar";

function Dashboard() {
  const [activeTab, setActiceTab] = useState("products");
  const [data, setData] = useState([]);

  const fetchData = async (tab) => {
    let url = "";
    switch (tab) {
      case "products":
        url = `http://localhost/Projects/ShoeStore/shoestore-backend/api/admin/admin-products.php`;
        break;
      case "orders":
        url = `http://localhost/Projects/ShoeStore/shoestore-backend/api/admin/admin-orders.php`;
        break;
      case "users":
        url = `http://localhost/Projects/ShoeStore/shoestore-backend/api/admin/admin-users.php`;
        break;
      case "categories":
        url = `http://localhost/Projects/ShoeStore/shoestore-backend/api/admin/admin-categories.php`;
        break;
      default:
        url = "";
    }

    if (url) {
      const tabRes = await fetch(url)
      const tabData = await tabRes.json();
      setData(tabData);
    } else {
      setData([]);
    }
  }
  console.log(data);
  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab])

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar setActiveTab={setActiceTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-gray-500 text-sm font-medium">Total Products</h2>
            <p className="mt-2 text-2xl font-bold text-gray-900">0</p>
          </div>
          <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-gray-500 text-sm font-medium">Total Orders</h2>
            <p className="mt-2 text-2xl font-bold text-gray-900">0</p>
          </div>
          <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-gray-500 text-sm font-medium">Total Revenue</h2>
            <p className="mt-2 text-2xl font-bold text-gray-900">0 PKR</p>
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            {/* products ka liye  */}
            {
              activeTab === "products" && (
                <div>

                  <div className="float-right p-2">
                    <button className="bg-blue-600 text-white px-[20px] py-[5px] rounded-xl cursor-pointer">Add Product +</button>
                  </div>

                  <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* products ka data  */}
                      {
                        data.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {item.image}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.new_price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <button className="bg-blue-600 text-white px-[20px] py-[5px] rounded">Edit</button>
                              |
                              <button className="bg-red-500 text-white px-[20px] py-[5px] rounded">Delete</button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>

                  </table>
                </div>
              )
            }

            {/* orders ka data  */}
            {
              activeTab === "orders" && (
                <div>
                  <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* products ka data  */}
                      {
                        data.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.order_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {item.fullname}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {item.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.status === 0 ? "Pending" : "Deliverd"}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.created_at}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <button className="bg-blue-600 text-white px-[20px] py-[5px] rounded">Edit</button>
                              |
                              <button className="bg-red-500 text-white px-[20px] py-[5px] rounded">Delete</button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>

                  </table>
                </div>
              )
            }

            {/* users ka liye code  */}
            {
              activeTab === "users" && (
                <div>
                  <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* products ka data  */}
                      {
                        data.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {item.fullname}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {item.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.password.substring(0, 9)}.....</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <button className="bg-blue-600 text-white px-[20px] py-[5px] rounded">Edit</button>
                              |
                              <button className="bg-red-500 text-white px-[20px] py-[5px] rounded">Delete</button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>

                  </table>
                </div>
              )
            }

            {/* category ka liye code  */}
            {
              activeTab === "categories" && (
                <div>
                  <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* products ka data  */}
                      {
                        data.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {item.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {item.parent_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <button className="bg-blue-600 text-white px-[20px] py-[5px] rounded">Edit</button>
                              |
                              <button className="bg-red-500 text-white px-[20px] py-[5px] rounded">Delete</button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>

                  </table>
                </div>
              )
            }
          </div>
        </div>

      </div>
    </div>
  );
}
export default Dashboard;