import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/client'
import { useEffect } from 'react'
import { RichText } from 'prismic-dom'

import { SEO } from '@/components/SEO'
import { getPrismicClient } from '@/services/prismic'
import { formatDate } from '@/utils/formatValues'
import { SessionProps } from '@/@types'

import {
  Container,
  PostContainer,
  PostContent,
  Subscribe
} from '@/styles/pages/posts/[slug]'

type PostPreviewProps = {
  post: {
    slug
    title
    content
    updatedAt
  }
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if ((session as SessionProps)?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <>
      <SEO title={post.title} />

      <Container>
        <PostContainer>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <PostContent
            dangerouslySetInnerHTML={{ __html: post.content }}
            preview
          />

          <Subscribe>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </Subscribe>
        </PostContainer>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('post', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: formatDate(response.last_publication_date, 'pt-BR')
  }

  return {
    props: { post },
    revalidate: 60 * 30
  }
}

export default PostPreview
