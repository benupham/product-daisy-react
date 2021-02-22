// import { PrismaClient } from '@prisma/client'
// import * as bodyParser from 'body-parser'
const express = require('express')
const cors = require('cors')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(cors())

// app.post(`/post`, async (req, res) => {
//   const { title, content, authorEmail } = req.body
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       published: false,
//       author: { connect: { email: authorEmail } },
//     },
//   })
//   res.json(result)
// })

// app.put('/publish/:id', async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.update({
//     where: { id: Number(id) },
//     data: { published: true },
//   })
//   res.json(post)
// })

// app.delete(`/post/:id`, async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   })
//   res.json(post)
// })

app.get(`/product/:id`, async (req, res) => {
  const { id } = req.params
  const product = await prisma.products.findUnique({
    where: {
      id: Number(id),
    },
  })
  res.json(product)
})

app.get(`/children/:id`, async (req, res) => {
  const { id } = req.params
  const children = await prisma.products.findMany({
    where: {
      parent: Number(id),
    },
  })
  res.json(children)
})

app.get(`/search`, async (req, res) => {
  const query = req.query.q
  console.log(query)
  const results = await prisma.products.findMany({
    where: {
      AND: [
        {
          name: {
            contains: query,
          },  
        },
        {
          type: 'product',
        }
      ]     
    },
  })
  res.json(results)
})


const server = app.listen(3001, () =>
  console.log(
    '🚀 Server ready at: http://localhost:3001\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api',
  ),
)
