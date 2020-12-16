import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToMany,
  AfterLoad,
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

import Entity from './Entity'
import User from './User'
import { makeId, slugify } from '../util/helpers'
import Sub from './Sub'
import Comment from './Comment'
import Vote from './Vote'

@TOEntity('posts')
export default class Post extends Entity {
  constructor(post: Partial<Post>) {
    super()
    Object.assign(this, post)
  }

  @Index()
  @Column()
  identifier: string // 7 Character Id

  @Column()
  title: string

  @Index()
  @Column()
  slug: string

  @Column({ nullable: true, type: 'text' })
  body: string

  @Column()
  subName: string

  @Column()
  username: string

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
  sub: Sub

  @Exclude()
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[]

  @Expose() get url(): string {
    return `/r/${this.subName}/${this.identifier}/${this.slug}`
  }

  @Expose() get commentCount(): number {
    return this.comments?.length
  }

  @Expose() get voteScore(): number {
    return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0)
  }

  protected userVote: number
  setUserVote(user: User) {
    const index = this.votes?.findIndex((v) => v.username === user.username)
    this.userVote = index > -1 ? this.votes[index].value : 0
  }

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7)
    this.slug = slugify(this.title)
  }
}
