import { setAuthorizationToken } from "@/axios/instance";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    // router.push("/login")
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
