import { RequestHandler } from "express";
import { User } from "../models/User";

export const register: RequestHandler = async (req, res) => {
  if (req.body.email && req.body.password) {
    let { email, password } = req.body

    let hasUser = await User.findOne({ where: { email } })

    if (!hasUser) {
      let newUser = await User.create({ email, password })

      res.status(201).json({ id: newUser.id })
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
      res.json({ status: true })
      return
    }
  }

  res.json({ status: false })
}