import { useRouter } from 'next/dist/client/router'
import Link, { LinkProps } from 'next/link'
import { cloneElement, ReactElement } from 'react'

type ActiveLinkProps = LinkProps & {
  children: ReactElement
}

export const ActiveLink = ({ children, ...rest }: ActiveLinkProps) => {
  const { asPath } = useRouter()

  const active = asPath === rest.href

  return (
    <Link {...rest}>
      {cloneElement(children, { className: active ? 'active' : '' })}
    </Link>
  )
}
