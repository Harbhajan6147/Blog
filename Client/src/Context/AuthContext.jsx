import { useState, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  
  const [user, setUser] = useState(() => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user in localStorage");
    return null;
  }
});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  

  const [blog_data, setBlogsData]= useState([]);

  const signup = async (formData) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", formData);
    
      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
       
       
      }
   else{
        throw new Error(res.data.message);
   }
      return res;
    } catch (err) {
      return {data:{ success: false, message: err.response?.data?.message || err.message}}
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", formData);
       
       if(res.data.success){
         setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    
        localStorage.setItem("user", JSON.stringify(res.data.user));
      return res;
       }else{
       
        throw new Error(res.data.message);
       }
      
    } catch (err) {
      
      return {data:{ success: false, message: err.response?.data?.message || err.message}}
      
    }
  };
  


  return (
    <AuthContext.Provider value={{ user, token, signup, login,  setToken, setUser,blog_data, setBlogsData,isOpenNotification, setIsOpenNotification }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);