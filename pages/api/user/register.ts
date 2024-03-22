import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/services/auth/services";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method != 'POST') {
    res.status(405).json({ status: false, message: 'Method not allowed' })
  }

  await signUp(req.body,
    (status: boolean) => {
      if (status) {
        res.status(200).json({ status: true, message: 'success ' })
      } else {
        res.status(400).json({ status: false, message: 'error ' })
      }
    })

  res.status(200).json({
    status: true,
    message: 'Connect'
  })
}