import express from 'express'
import { PORT, SECRET_JWT_KEY } from './config.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import router from './routes/routes.js'

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch (error) {
    req.session.user = null
  }

  next()
})
app.use(router)
app.listen(PORT, () => { console.log(`Server is listen on port ${PORT}`) })
