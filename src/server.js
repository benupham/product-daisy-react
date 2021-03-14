// import { PrismaClient } from '@prisma/client'
// import * as bodyParser from 'body-parser'
const express = require('express')
const cors = require('cors')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(cors())

app.get(`/allItems`, async (req, res) => {
  const allItems = await prisma.products.findMany({
    where: {
    OR: [
      {
        dept: { in: [930,23047,23511,4550] },
      },
      {
        id: { in: [930,23047,23511,4550]},
      }
    ]}
  })
  res.json(allItems);
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
  const type = req.query.type ? req.query.type : 'product'
  const dept = req.query.dept; 
  const subdept = req.query.subdept;
  const sale = req.query.sale;
  const qty = req.query.qty ? req.query.qty : 20; 
  
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
  if (subdept) {
    andStatement.push({
      subdept: Number(subdept),
    })
  }
  if (sale) {
    andStatement.push({
      sale: Number(sale),
    })
  }
  const prismaQuery = {
    take: Number(qty),
    where: {
      AND: andStatement,     
    },
  }
  console.log(prismaQuery)
  const results = await prisma.products.findMany(prismaQuery)
  res.json(results)
})


const server = app.listen(3001, () =>
  console.log(
    '🚀 Server ready at: http://localhost:3001\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api',
  ),
)
