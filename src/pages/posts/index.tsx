import { GetStaticProps } from 'next'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { SEO } from '@/components/SEO'
import { getPrismicClient } from '@/services/prismic'
import { Container, Post } from '@/styles/pages/posts'
import { formatDate } from '@/utils/formatValues'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { SessionProps } from '@/@types'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

type PostsProps = {
  posts: Post[]
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [session] = useSession()
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    if ((session as SessionProps)?.activeSubscription) setIsLogged(true)
  }, [session])

  return (
    <>
      <SEO title="Posts" />
      <Container>
        <Post>
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/posts/${!isLogged ? 'preview/' : ''}${post.slug}`}
            >
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </Post>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100
    }
  )

  const posts = response.results.map(post => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt:
      post.data.content.find(content => content.type === 'paragraph')?.text ??
      '',
    updatedAt: formatDate(post.last_publication_date, 'pt-BR')
  }))

  return {
    props: {
      posts
    }
  }
}

export default Posts
