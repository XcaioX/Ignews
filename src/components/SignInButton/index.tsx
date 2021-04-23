import { signIn, useSession, signOut } from 'next-auth/client'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import { Container } from './styles'

export const SignInButton: React.FC = () => {
  const [session] = useSession()

  return session ? (
    <Container type="button">
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" onClick={() => signOut()} />
    </Container>
  ) : (
    <Container type="button" onClick={() => signIn('github')}>
      <FaGithub color="#eba417" />
      Sign in with Github
    </Container>
  )
}
