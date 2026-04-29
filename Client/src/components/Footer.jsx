import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-green-50">

      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">

      
        <div>
          <span className="text-2xl font-semibold cursor-pointer">
            <span className="underline decoration-green-500">
              pu<span className='text-green-500'>b</span>lish
            </span>.
            <span className="text-green-500 underline decoration-black">ai</span>
          </span>

          <p className="max-w-[410px] mt-6 text-sm">
            Publish.ai is a modern blogging platform where creativity meets artificial intelligence.
            We combine human ideas with AI-powered tools to generate and share high-quality blog content.
          </p>

         
          <div className="flex gap-4 mt-6 text-lg">
            <a href="#" className="hover:text-green-600">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="hover:text-green-600">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="hover:text-green-600">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="hover:text-green-600">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="#" className="hover:text-green-600">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>

     
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-10">

        
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="hover:text-green-600 cursor-pointer">Home</li>
              <li className="hover:text-green-600 cursor-pointer">Blogs</li>
              <li className="hover:text-green-600 cursor-pointer">About</li>
              <li className="hover:text-green-600 cursor-pointer">Contact</li>
            </ul>
          </div>

        
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="hover:text-green-600 cursor-pointer">Technology</li>
              <li className="hover:text-green-600 cursor-pointer">Artificial Intelligence</li>
              <li className="hover:text-green-600 cursor-pointer">Programming</li>
              <li className="hover:text-green-600 cursor-pointer">Startups</li>
            </ul>
          </div>

       
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="hover:text-green-600 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-green-600 cursor-pointer">Terms</li>
              <li className="hover:text-green-600 cursor-pointer">Help Center</li>
              <li className="hover:text-green-600 cursor-pointer">FAQ</li>
            </ul>
          </div>

        </div>

      </div>

    
      <p className="p-4 text-center text-sm md:text-base text-gray-500">
        Copyright 2026 © publish.ai - All Rights Reserved
      </p>

    </div>
  )
}

export default Footer