import { UserRepository } from '../models/user-repository.js'
import { SECRET_JWT_KEY } from '../config.js'
import jwt from 'jsonwebtoken'
export const loginGet = (req, res) => {
  const { user } = req.session
  res.render('index', user)
}

export const loginPost =  async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      }
    )
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      .status(200).send({ user, token })
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
}

export const registerPost = async (req, res) => {
  const { username, password } = req.body
  try {
    const id = await UserRepository.create({
      username,
      password
    })
    res.send({ id })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

export const logoutPost  =(req, res) => {
  res
    .clearCookie('access_token')
    .json({ message: 'Logout successful' })
}

export const protectedGet = (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Access not authorized')
  res.render('protected', user)
}