import { RequestHandler } from "express";
import * as userService from '../services/user'

export const getAll: RequestHandler = async (req, res) => {
  const users = await userService.getAll()
  const list: string[] = []

  users.map((user) => {
    list.push(user.email)
  })

  res.json({ users: list })
}