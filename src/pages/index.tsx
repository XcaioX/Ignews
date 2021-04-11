import { GetStaticProps } from 'next'

import { SEO } from '@/components/SEO'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '@/services/stripe'
import { formatPrice } from '@/utils/formatValues'

import styles from './home.module.scss'

type HomeProps = {
  product: {
    priceId: string
    amount: number
  }
}

const Home: React.FC<HomeProps> = ({ product }) => {
  return (
    <>
      <SEO title="Home" />

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for $9.99 month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding!" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IdQoLL1b92we05L31o242v1', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: formatPrice(price.unit_amount / 100, 'en-US', 'USD')
  }

  return {
    props: { product },
    redirect: 60 * 60 * 24 // 24 hours
  }
}

export default Home
