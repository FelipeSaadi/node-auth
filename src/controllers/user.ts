import { RequestHandler } from "express";
import { User } from "../models/User";

export const findAll: RequestHandler = async (req, res) => {
  const users = await User.findAll()
  const list: string[] = []

  users.map((user) => {
    list.push(user.email)
  })

  res.json({ users: list })
}