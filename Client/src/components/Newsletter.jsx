import React from 'react'

const Newsletter = () => {
  return (
     <div className="flex flex-col items-center justify-center text-center space-y-3 my-32 ">
        <h1 className='text-green-400'>Never Miss a Blog!</h1>
        <p>Subscribe to our newsletter to get the latest blog, new tech and insights news </p>
         <form  className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
            <input type="email"  placeholder='Enter your email id' className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500" required />
            <button type="submit" className="md:px-12 px-8 h-full text-black bg-yellow-200 hover:bg-yellow-300 transition-all cursor-pointer rounded-md rounded-l-none">Subscribe</button>
         </form>
     </div>
  )
}

export default Newsletter