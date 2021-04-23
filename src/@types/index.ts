import { Session } from 'next-auth'

export type SessionProps = Session & {
  activeSubscription: object
}
