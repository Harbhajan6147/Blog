import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

const res=    await signup({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    
    if(res.data.success){
      alert("Signup successful");
    }

     else{
      alert("Signup failed: " + res.data.message);
     }
  
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-blue-100">
      
      {/* Signup Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Create Account 🚀
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join us today
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
          Create Account
        </button>
      </form>

      {/* Already Have Account Section */}
      <div className="mt-6 bg-white px-6 py-4 rounded-xl shadow-md w-96 text-center">
        <p className="text-gray-600 text-sm">
          Already have an account?
        </p>
        <Link
          to="/login"
          className="inline-block mt-2 text-green-500 font-semibold hover:underline"
        >
          Login here →
        </Link>
      </div>
    </div>
  );
}