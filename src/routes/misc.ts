import { Request, Response, Router } from 'express'
import Comment from '../entities/Comment'
import Post from '../entities/Post'
import User from '../entities/User'
import Vote from '../entities/Vote'

import auth from '../middleware/auth'

const vote = async (req: Request, res: Response) => {
  const { identifier, slug, commentIdentifier, value } = req.body

  // Validate vote value
  if (![-1, 0, 1].includes(value)) {
    return res.status(400).json({ value: 'Value must be -1, 0 or 1' })
  }

  try {
    const user: User = res.locals.user
    let post = await Post.findOneOrFail({ identifier, slug })
    let vote: Vote | undefined
    let comment: Comment | undefined

    if (commentIdentifier) {
      // IF there is a comment identifier find vote by comment
      comment = await Comment.findOneOrFail({ identifier: commentIdentifier })
      vote = await Vote.findOne({ user, comment })
    } else {
      // Else find vote by post
      vote = await Vote.findOne({ user, post })
    }

    if (!vote && value === 0) {
      // if no vote and value = 0 return error
      return res.status(404).json({ error: 'Vote not found' })
    } else if (!vote) {
      // If no vote create it
      vote = new Vote({ user, value })
      if (comment) vote.comment = comment
      else vote.post = post
      await vote.save()
    } else if (value === 0) {
      // If vote exists and value = 0 remove vote from DB
      await vote.remove()
    } else if (vote.value !== value) {
      // If vote and value has changed, update vote
      vote.value = value
      await vote.save()
    }

    post = await Post.findOneOrFail(
      { identifier, slug },
      { relations: ['comments', 'comments.votes', 'sub', 'votes'] }
    )
    post.setUserVote(user)
    post.comments.forEach((c) => c.setUserVote(user))

    return res.json(post)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const router = Router()
router.post('/vote', auth, vote)

export default router
