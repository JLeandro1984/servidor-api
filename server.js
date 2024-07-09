import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const app = express()
app.use(express.json())

/*'habilita qual página pode acessar seu ambiente, 
para ter segurança, se deixar como "cors()", qualquer um pode ter 
acesso, sendo inseguro, como é teste vamos deixar liberado'*/
app.use(cors()) 


app.post('/usuarios', async (req, res)=> {
  /*console.log(req.body) teste*/
await prisma.user.create({
  data:{
    email: req.body.email,
    name: req.body.name,
    age: req.body.age

}})

  res.status(201).send(req.body)
})

app.put('/usuarios/:id', async (req, res)=> {
  /*console.log(req.body)*/
await prisma.user.update({
  where:{
    id:req.params.id
  },
  data:{
    email: req.body.email,
    name: req.body.name,
    age: req.body.age

}})

  res.status(201).send(req.body)
})

app.delete('/usuarios/:id', async (req, res)=> {

await prisma.user.delete({
  where:{
    id:req.params.id
  }
})

  res.status(200).json({message: "Usuário deletado com sucesso!"})
})

app.get('/usuarios', async (req, res)=> {
  let users = []
try {
  if(req.query){
    users = await prisma.user.findMany({
      where: {
        email: req.query.email,
        name: req.query.name,
        age: req.query.age
      }
    })
  
  }else {
    users = await prisma.user.findMany();
 }
  res.status(200).json(users)
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
 
})

app.listen(3000)

/*
  1) Tipo de rota / Métododo HTTP
  2) Endereço
*/

/*
    user:jlrodriguesDev 
    puk:e5xyNAzTJhjNW9Q1
 */