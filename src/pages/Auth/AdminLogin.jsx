import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  let navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    
    const LoginRes = await fetch(
        `http://localhost/Projects/ShoeStore/shoestore-backend/api/admin/admin-login.php`,
        {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            credentials : "include",
            body : JSON.stringify({
                userEmail : email,
                userPassword : password
            })
        }
    );

    const LoginData = await LoginRes.json();
    
    if(LoginData.status)
    {
      setMessageType("success");
      setMessage(LoginData.message);
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    }else{
      setMessageType("error");
      setMessage(LoginData.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">

        {/* login message */}
        {message && (
          <div className={`mb-4 p-3 rounded text-white text-center ${messageType === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {message}
          </div>
        )}

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to <span className="text-blue-500">Admin</span>
        </h2>

        {/* Form */}
        <form method="post" className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(val) => setEmail(val.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(val) => setPassword(val.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
