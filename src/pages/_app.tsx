import { AppProps } from 'next/app'
import { Provider as NextAuthProvider } from 'next-auth/client'

import { Header } from '../components/Header'
import { GlobalStyles } from '@/styles/global'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <NextAuthProvider session={pageProps.session}>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
