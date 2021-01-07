import { Request, Response, Router } from 'express'
import Comment from '../entities/Comment'
import Post from '../entities/Post'
import User from '../entities/User'

import user from '../middleware/user'

const getUserSubmissions = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneOrFail({
      where: { username: req.params.username },
      select: ['username', 'createdAt'],
    })

    const posts = await Post.find({
      where: { user },
      relations: ['comments', 'votes', 'sub'],
    })

    const comments = await Comment.find({
      where: { user },
      relations: ['post'],
    })

    if (res.locals.user) {
      posts.forEach((p) => p.setUserVote(res.locals.user))
      comments.forEach((c) => c.setUserVote(res.locals.user))
    }

    let submissions: any[] = []
    posts.forEach((p) => submissions.push({ type: 'Post', ...p.toJSON() }))
    comments.forEach((c) =>
      submissions.push({ type: 'Comment', ...c.toJSON() })
    )

    submissions.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1
      if (b.createdAt < a.createdAt) return -1
      return 0
    })

    return res.json({ user, submissions })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const router = Router()

router.get('/:username', user, getUserSubmissions)

export default router
