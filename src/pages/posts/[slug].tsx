import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { RichText } from 'prismic-dom'

import { SEO } from '@/components/SEO'
import { getPrismicClient } from '@/services/prismic'
import { formatDate } from '@/utils/formatValues'
import { SessionProps } from '@/@types'

import {
  Container,
  PostContainer,
  PostContent
} from '@/styles/pages/posts/[slug]'

type PostProps = {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <>
      <SEO title={post.title} />

      <Container>
        <PostContainer>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
        </PostContainer>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const session = await getSession({ req })
  const { slug } = params

  if (!(session as SessionProps)?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/${slug}`,
        permanent: false
      }
    }
  }

  const prismic = getPrismicClient(req)

  const response = await prismic.getByUID('post', String(slug), {})
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: formatDate(response.last_publication_date, 'pt-BR')
  }

  return {
    props: { post }
  }
}

export default Post
