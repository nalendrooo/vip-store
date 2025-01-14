import { deleteData, retriveData, retriveDataByField, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await retriveData('users')
  const data = users.map((user: any) => {
    delete user.password
    return user
  })

  if (req.method === 'GET') {
    res.status(200)
    .json({
      status: true,
      statusCode: 200,
      message: 'success',
      data
    })
  } else if ( req.method === 'PUT') {
    const { id, data } = req.body

    await updateData('users', id, data, (result: boolean) => {
      if (result) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: 'success'
        })
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: 'failed'
        })
      }
    })
  } else if ( req.method === 'DELETE') {
    const { id }: any = req.query

    await deleteData('users', id[0], (result: boolean) => {
      if (result) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: 'success'
        })
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: 'failed'
        })
      }
    })
  }
}