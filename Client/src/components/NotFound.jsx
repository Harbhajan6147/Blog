import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

const BlogNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="flex flex-col items-center justify-center text-center px-6 py-24">

        {/* 404 Number */}
        <h1 className="text-8xl font-bold text-green-400">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-800 mt-6">
          Blog Not Found
        </h2>

        {/* Message */}
        <p className="text-gray-500 max-w-md mt-4">
          The article you are looking for doesn't exist or may have been removed.
          Try exploring other blogs.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">

          <Link
            to="/"
            className="px-6 py-3 rounded-lg bg-green-400 text-white font-medium hover:bg-green-500 transition"
          >
            Go Home
          </Link>

          <Link
            to="/"
            className="px-6 py-3 rounded-lg border border-green-400 text-green-500 font-medium hover:bg-green-50 transition"
          >
            Browse Blogs
          </Link>

        </div>

      </div>
      <Footer/>
    </div>

  );
};

export default BlogNotFound;