import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    let allowed = false
    const authorization = req.headers.authorization

    if (authorization) {
      const hash: string = authorization.split(' ')[1]
      const decoded: string = Buffer.from(hash, 'base64').toString()
      const data: string[] = decoded.split(':')

      if (data.length === 2) {
        const hasUser = await User.findOne({
          where: {
            email: data[0],
            password: data[1]
          }
        })

        if (hasUser) {
          allowed = true
        }
      }
    }

    if (allowed) {
      next()
    }
    else {
      res.status(403).json({ error: 'Not allowed' })
    }
  }
}