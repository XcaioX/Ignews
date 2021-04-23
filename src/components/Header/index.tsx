import { ActiveLink } from '../ActiveLink'
import { SignInButton } from '../SignInButton'

import { Container, Content, NavigationLinks } from './styles'

export const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src="/images/logo.svg" alt="ig.newss" />
        <nav>
          <ActiveLink href="/">
            <NavigationLinks>Home</NavigationLinks>
          </ActiveLink>
          <ActiveLink href="/posts" prefetch>
            <NavigationLinks>Posts</NavigationLinks>
          </ActiveLink>
        </nav>

        <SignInButton />
      </Content>
    </Container>
  )
}
