import { setAuthorizationToken } from "@/axios/instance";
import "@/styles/globals.css";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }) {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setAuthorizationToken(user.token)
    console.log(user)
  }, [])
  return<>
  <Component {...pageProps} />
  <ToastContainer 
    position="bottom-left" 
    autoClose={5000} 
    hideProgressBar={false} 
    newestOnTop={false} 
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
</>
}
