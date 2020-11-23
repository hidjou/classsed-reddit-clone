import { IsEmail, Length } from 'class-validator'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm'
import bcrypt from 'bcrypt'
import { classToPlain, Exclude } from 'class-transformer'

@Entity('users')
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super()
    Object.assign(this, user)
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string

  @Index()
  @Length(3, 255, { message: 'Username must be at least 3 characters long' })
  @Column({ unique: true })
  username: string

  @Exclude()
  @Column()
  @Length(6, 255)
  password: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6)
  }

  toJSON() {
    return classToPlain(this)
  }
}
