// import { PrismaClient } from '@prisma/client'
// import * as bodyParser from 'body-parser'
const express = require('express')
const cors = require('cors')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(cors())

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
  const type = req.query.type ? req.query.type : 'product'
  const dept = req.query.dept; 
  const sale = req.query.sale; 

  const andStatement = [];
  andStatement.push({
    type: type,
  });

  if (query) {
    andStatement.push({
      name: {
        contains: String(query),
      },  
    }) 
  }
  if (dept) {
    andStatement.push({
      dept: Number(dept),
    })
  }
  if (sale) {
    andStatement.push({
      sale: Number(sale),
    })
  }
  const prismaQuery = {
    take: 20,
    where: {
      AND: andStatement,     
    },
  }
  const results = await prisma.products.findMany(prismaQuery)
  res.json(results)
})


const server = app.listen(3001, () =>
  console.log(
    '🚀 Server ready at: http://localhost:3001\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api',
  ),
)
