import { Validation }  from "../utils/validation.js"
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { SALT_ROUND } from '../config.js'
import { User } from "../models/user.model.js"

export class UserRepository {
  static async create ({ username, password }) {
    Validation.password(password)
    Validation.username(username)
    const user = User.findOne({ username })
    if (user) throw new Error(`The username: ${username} is already taken`)
    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND)
    User.create({
      id,
      username,
      password: hashedPassword
    }).save()

    return id
  };
  static async login ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (!user) throw new Error('This user does not exist in our database')
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Incorrect password')
    const { password: _, ...publicUser } = user
    console.log(publicUser)
    return publicUser
  }
};
