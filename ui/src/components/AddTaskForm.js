import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import UpdateTaskForm from './UpdateTaskForm';

const AddTaskForm = () => {
  const [newTask, setNewTask] = useState('')

  const addNewTask = () => {
    console.log("Add new task")
  }
  return (
    <div>
      <Typography align="center" variant='h2' paddingTop={2}>My Task List</Typography>

      <div className="addTaskForm">
        <TextField size='small' label="Task" variant="outlined" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>

        <Button disabled= {!newTask.length} variant="outline" onClick={addNewTask}>
          <AddIcon />
        </Button>
      </div>
    </div>
    
  )
}

export default AddTaskForm