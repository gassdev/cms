import TopNav from '../components/TopNav'
import { AuthProvider } from '../context/auth'
import { ThemeProvider } from '../context/theme'
import { Toaster } from 'react-hot-toast'
// import 'antd/dist/antd.css'
// import 'antd/dist/antd.dark.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TopNav />
        <Toaster toastOptions={{ duration: 5000 }} />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
