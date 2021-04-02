import { Container } from '@/styles/components/modal'

export const Modal: React.FC = ({ children }) => {
  return (
    <Container>
      <div>{children}</div>
    </Container>
  )
}
