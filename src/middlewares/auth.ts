import { NextFunction, Request, Response } from "express";

export const Auth = {
  private: (req: Request, res: Response, next: NextFunction) => {
    const allowed = false

    if (allowed) {
      next()
    }
    else {
      res.status(403).json({ error: 'Not allowed' })
    }
  }
}