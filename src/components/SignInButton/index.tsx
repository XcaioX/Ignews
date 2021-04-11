import { signIn, useSession, signOut } from 'next-auth/client'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styled from './style.module.scss'

export const SignInButton: React.FC = () => {
  const [session] = useSession()

  return session ? (
    <button
      type="button"
      className={styled.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styled.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styled.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  )
}
