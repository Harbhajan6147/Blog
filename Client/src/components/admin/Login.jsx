import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
   const res= await login(form);
     if(res.data.success){
      alert("Login successful!");
     }else{
      alert("Login failed: " + res.data.message);
     }
   
   
  };

  const handleForgotPassword = () => {
    // You can navigate or trigger modal/API here
    alert("Redirect to forgot password page");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition"
          >
            Forgot Password?
          </button>
        </div>

        
        <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
          Login
        </button>

      
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

      
        <p className="text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-green-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}