import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  let navigate = useNavigate();
  let handleSubmit = async (e) => {
    e.preventDefault();
    if(password.length < 6)
    {
      alert("Password must be 6 character.");
      return;
    }
    if(password !== confirmpass)
    {
      alert("Password and Confirm password not matched.");
      return;
    }
    const res = await fetch(
      "http://localhost/Projects/ShoeStore/shoestore-backend/api/register.php",
      {
        method : "POST",
        headers : {"content-type" : "application/json"},
        body : JSON.stringify({
          fullname,
          email,
          password,
          confirmpass
        })
      }

    );
    let data = await res.json();
    if(data.status)
    {
      setMessageType("success");
      setMessage(data.message);
      setTimeout(() => {
        navigate("/login-page");
      }, 1000);
    }else{
      setMessageType("error");
      setMessage(data.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {/* register message  */}
        {
          message && (
            <div className={`p-3 rounded text-white text-center ${messageType === "success" ? "bg-green-500" : "bg-red-500"}`}>
              {message}
            </div>
          )
        }
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {/* Form */}
        <form method="post" className="space-y-4" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={fullname}
              onChange={(val) => setFullname(val.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              placeholder="Create password"
              value={password}
              onChange={(val) => setPassword(val.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmpass}
              onChange={(val) => setConfirmPass(val.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
          >
            Register
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login-page" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
