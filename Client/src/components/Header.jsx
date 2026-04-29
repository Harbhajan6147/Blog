import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { blog_data } from "../assets/assests";

export const Header = () => {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      
      <div className="text-center mt-20 mb-8">
        
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: AI feature integrated</p>
          <FontAwesomeIcon icon={faStar} />
        </div>

        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16">
          Your Own <span className="text-green-400">blogging</span>
          <br />
          platform
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs">
          This is your space to think out loud, to share what matters, and to write without filters.
          Whether it's one word or a thousand, your story starts right here.
        </p>

        

      </div>
      
    </div>
  );
};