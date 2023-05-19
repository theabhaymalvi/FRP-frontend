import '../styles/globals.css'
import '../styles/App.css'
import Navbar from "../components/Navbar"
import { ChakraProvider } from '@chakra-ui/react'
import {AuthProvider} from "../context/AuthContext"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
    <AuthProvider>
    <Navbar/>
    <Component {...pageProps} />
    </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp;
