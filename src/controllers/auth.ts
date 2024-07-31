import { RequestHandler } from "express";
import JWT from 'jsonwebtoken'
import { User } from "../models/User";

export const register: RequestHandler = async (req, res) => {
  if (req.body.email && req.body.password) {
    let { email, password } = req.body

    let hasUser = await User.findOne({ where: { email } })

    if (!hasUser) {
      let newUser = await User.create({ email, password })

      const token = JWT.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '2h' }
      )

      res.status(201).json({ id: newUser.id, token })
    }
    else {
      res.json({ error: 'An error has occurred at user creation' })
    }
  }
  else {
    res.json({ error: 'E-mail or password not sended' })
  }
}

export const login: RequestHandler = async (req, res) => {
  if (req.body.email && req.body.password) {
    let { email, password } = req.body

    let user = await User.findOne({
      where: { email, password }
    })

    if (user) {
      const token = JWT.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '2h' }
      )
      res.json({ status: true, token })
      return
    }
  }

  res.json({ status: false })
}