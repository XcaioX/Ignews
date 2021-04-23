import { signIn, useSession } from 'next-auth/client'

import { getStripeJs } from '@/services/stripe-js'
import { api } from '@/services/api'

import { Container } from './styles'
import { useRouter } from 'next/dist/client/router'
import { SessionProps } from '@/@types'

type SubscribeButtonProps = {
  priceId: string
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = () => {
  const [session] = useSession()
  const router = useRouter()

  const handleSubscribe = async () => {
    if (!session) {
      signIn('github')
      return
    }

    if ((session as SessionProps).activeSubscription) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Container type="button" onClick={handleSubscribe}>
      Subscribe now
    </Container>
  )
}
