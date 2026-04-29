export const blogCategories =['All','Technology','Startup','Lifestyle','Finance']

 export const blog_data = [
  {
    _id: "1",
    title: "The Rise of AI-Powered Cities",
    subTitle: "How smart infrastructure is reshaping urban life",
    author: "Aarav Sharma",
    description:
      "<h1>AI Cities</h1><p>Smart cities powered by AI are transforming transportation, energy systems, waste management, and public safety. With real-time analytics and predictive infrastructure, cities are becoming more efficient, sustainable, and livable.</p><p>AI-driven traffic control, smart grids, and automated emergency response systems are redefining urban experiences.</p>",
    category: "technology",
    image: "https://picsum.photos/seed/cityai/800/400",
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true,
  },

  {
    _id: "2",
    title: "Building a Startup in the Age of AI",
    subTitle: "Why AI-first startups are dominating markets",
    author: "Neha Verma",
    description:
      "<h1>AI Startups</h1><p>Modern startups are leveraging AI to automate operations, improve decision-making, and scale rapidly with minimal resources.</p><p>From product development to marketing automation, AI-first companies are disrupting traditional business models.</p>",
    category: "startup",
    image: "https://picsum.photos/seed/startupai/800/400",
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true,
  },

  {
    _id: "3",
    title: "Digital Minimalism in a Hyperconnected World",
    subTitle: "Balancing tech and peace of mind",
    author: "Rohan Mehta",
    description:
      "<h1>Digital Minimalism</h1><p>In a world overloaded with notifications, digital minimalism helps restore focus and mental clarity.</p><p>By reducing screen time, limiting social media usage, and consuming intentional content, people can improve productivity and emotional well-being.</p>",
    category: "lifestyle",
    image: "https://picsum.photos/seed/minimal/800/400",
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true,
  },

  {
    _id: "4",
    title: "Future of Personal Finance with AI Advisors",
    subTitle: "Smarter money management",
    author: "Priya Nair",
    description:
      "<h1>AI Finance</h1><p>AI-powered financial advisors analyze spending habits, income patterns, and market trends to provide personalized investment strategies.</p><p>This allows individuals to make smarter financial decisions with minimal effort.</p>",
    category: "finance",
    image: "https://picsum.photos/seed/financeai/800/400",
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true,
  },

  {
    _id: "5",
    title: "Web3 and the Decentralized Internet",
    subTitle: "The next evolution of the web",
    author: "Karan Malhotra",
    description:
      "<h1>Web3 Revolution</h1><p>Web3 is transforming the internet by removing centralized control and giving users ownership of their data.</p><p>Blockchain technology enables decentralized applications, smart contracts, and trustless systems.</p>",
    category: "technology",
    image: "https://picsum.photos/seed/web3/800/400",
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true,
  },

  {
    _id: "6",
    title: "From Idea to MVP in 30 Days",
    subTitle: "Startup execution blueprint",
    author: "Aditya Singh",
    description:
      "<h1>MVP Guide</h1><p>Building a startup quickly requires focus, prioritization, and execution speed.</p><p>The MVP approach helps validate ideas with real users before investing heavily in development.</p>",
    category: "startup",
    image: "https://picsum.photos/seed/mvp/800/400",
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true,
  },

  {
    _id: "7",
    title: "Biohacking Your Daily Routine",
    subTitle: "Optimize your body and mind",
    author: "Simran Kaur",
    description:
      "<h1>Biohacking</h1><p>Biohacking involves improving physical and mental performance through science-backed lifestyle changes.</p><p>Sleep optimization, nutrition tracking, and mindfulness practices are key components of biohacking.</p>",
    category: "lifestyle",
    image: "https://picsum.photos/seed/biohack/800/400",
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true,
  },

  {
    _id: "8",
    title: "Cryptocurrency Trends to Watch",
    subTitle: "Future of digital money",
    author: "Vikram Joshi",
    description:
      "<h1>Crypto Trends</h1><p>Cryptocurrency continues to evolve with new innovations like DeFi, NFTs, and tokenized assets.</p><p>Blockchain adoption is increasing across finance, gaming, and supply chain industries.</p>",
    category: "finance",
    image: "https://picsum.photos/seed/crypto/800/400",
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true,
  },

  {
    _id: "9",
    title: "AI Robotics Revolution",
    subTitle: "Machines that think and act",
    author: "Arjun Patel",
    description:
      "<h1>AI Robotics</h1><p>Robotics combined with AI is creating intelligent machines capable of learning and adapting.</p><p>These systems are being used in manufacturing, healthcare, and space exploration.</p>",
    category: "technology",
    image: "https://picsum.photos/seed/robot/800/400",
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true,
  },

  {
    _id: "10",
    title: "Startup Funding Secrets",
    subTitle: "How to attract investors",
    author: "Mehul Jain",
    description:
      "<h1>Funding Guide</h1><p>Getting funding requires a strong pitch, clear vision, and proof of traction.</p><p>Investors look for scalability, strong teams, and market potential.</p>",
    category: "startup",
    image: "https://picsum.photos/seed/funding/800/400",
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true,
  },

  // ---- remaining 15 (same quality style) ----

  {
    _id: "25",
    title: "Future of Remote Work",
    subTitle: "Work from anywhere revolution",
    author: "Nitin Gupta",
    description:
      "<h1>Remote Work</h1><p>Remote work is reshaping global employment with flexible schedules and distributed teams.</p><p>AI tools, virtual offices, and cloud collaboration make working from anywhere seamless.</p>",
    category: "lifestyle",
    image: "https://picsum.photos/seed/remote2/800/400",
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true,
  },
];
export const comments_data = [
        {
            "_id": "6811ed9e7836a82ba747cb25",
            "blog": blog_data[0],
            "name": "Michael Scott",
            "content": "This is my new comment",
            "isApproved": false,
            "createdAt": "2025-04-30T09:30:06.918Z",
            "updatedAt": "2025-04-30T09:30:06.918Z",
            "__v": 0
        },
        {
            "_id": "6810a752fbb942aa7cbf4adb",
            "blog": blog_data[1],
            "name": "John Doe",
            "content": "This is a nice blog",
            "isApproved": false,
            "createdAt": "2025-04-29T10:17:54.832Z",
            "updatedAt": "2025-04-29T10:17:54.832Z",
            "__v": 0
        },
        {
            "_id": "680779aebef75c08f8b4898f",
            "blog": blog_data[2],
            "name": "Jack London",
            "content": "Hi this blog is must to read",
            "isApproved": true,
            "createdAt": "2025-04-22T11:12:46.547Z",
            "updatedAt": "2025-04-22T11:13:10.015Z",
            "__v": 0
        },
        {
            "_id": "680770aeb2897e5c28bf9b26",
            "blog": blog_data[3],
            "name": "Sam Smith",
            "content": "This is the best blog, everybody should read it",
            "isApproved": false,
            "createdAt": "2025-04-22T10:34:22.020Z",
            "updatedAt": "2025-04-22T10:34:22.020Z",
            "__v": 0
        },
        {
            "_id": "68076468e32055c94a696cf5",
            "blog": blog_data[4],
            "name": "Peter Lawrence",
            "content": "Honestly, I did not expect this to work, but it totally did. Saved my project!",
            "isApproved": true,
            "createdAt": "2025-04-22T09:42:00.444Z",
            "updatedAt": "2025-04-22T10:24:55.626Z",
            "__v": 0
        }
    ]

  
export const dashboard_data = {
    "blogs": 10,
    "comments": 5,
    "drafts": 0,
    "recentBlogs": blog_data.slice(0, 5),
}
