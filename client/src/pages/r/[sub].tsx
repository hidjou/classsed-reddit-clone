import { useRouter } from 'next/router'
import useSWR from 'swr'
import PostCard from '../../components/PostCard'

export default function Sub() {
  const router = useRouter()

  const subName = router.query.sub

  const { data: sub, error } = useSWR(subName ? `/subs/${subName}` : null)

  if (error) router.push('/')

  let postsMarkup
  if (!sub) {
    postsMarkup = <p className="text-lg text-center">Loading..</p>
  } else if (sub.posts.length === 0) {
    postsMarkup = <p className="text-lg text-center">No posts submitted yet</p>
  } else {
    postsMarkup = sub.posts.map((post) => (
      <PostCard key={post.identifier} post={post} />
    ))
  }

  return (
    <div className="container flex pt-5">
      {sub && <div className="w-160">{postsMarkup}</div>}
    </div>
  )
}
