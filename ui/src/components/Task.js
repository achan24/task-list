import { Button, Checkbox, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit'; 
import React, { useState } from 'react'
import { UpdateTaskForm } from "./UpdateTaskForm"
import classnames from 'classnames'


const Task = ({ task }) => {
  const {id, name, completed} = task;
  const [isComplete, setIsComplete] = useState(completed)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleUpdateTaskCompletion = () => {
    setIsComplete((prev) => !prev)
  }

  const handleDeleteTask = () => {
    console.log("Delete task")
  }

  return (
    <div className='task'>
      {/* This is going to allow us to add class names dynamically
      The first class flex is always going to be applied
      The second class done is only going to applied if isComplete is true */}
      <div className={classnames("flex", {
        done: isComplete,
      })}>
        <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion}/>
        <Typography variant='h4'>{name}</Typography>
      </div>
      <div className='taskButtons'>
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={{handleDeleteTask}}>
          <DeleteIcon />
        </Button>
      </div>
      
        {/* This component is going to take in three props */}
        <UpdateTaskForm isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} task={task}/>
    </div>
  )
}

export default Task;