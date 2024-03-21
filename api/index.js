//use the express js hello world example
import express from 'express';
import serverless from 'serverless-http';
import cors from "cors";
import { fetchTasks, createTasks, updateTasks, deleteTasks} from "./task.js";


const app = express();
const port = 3001; //react app is on 3000
//need this to grab the body of the requests when they come in 
//without this line of code you're not going to be able to acces the body at all
app.use(express.json())


//api is going to need 4 different routes for us to hit
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//this is going to fetch our data
app.get('/task', async (req, res) => {
  try {
    const tasks = await fetchTasks()

    res.send(tasks.Items)
  } catch(err) {
    res.status(400).send(`Error fetching tasks: ${err}`)
  }
})


app.post('/task', async (req, res) => {
  try {
    const task = req.body;

    const response = await createTasks(task);

    res.send(response);
  } catch(err) {
    res.status(400).send(`Error creating tasks: ${err}`)
  }
})


app.put('/task', async (req, res) => {
  try {
    const task = req.body;

    const response = await updateTasks(task);
    
    res.send(response);
  } catch(err) {
    res.status(400).send(`Error updating tasks: ${err}`)
  }
})

//when you use a delete route - don't use the body
//use params
app.delete('/task/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const response = await deleteTasks(id);
    
    res.send(response);
  } catch(err) {
    res.status(400).send(`Error deleting tasks: ${err}`)
  }
})

//when testing locally use Development env variable
if(process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

//when we deploy use serverless
export const handler = serverless(app);