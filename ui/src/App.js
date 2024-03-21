import React, { useState, useEffect} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AddTaskForm } from './components/AddTaskForm';
import { Task } from './components/Task';
import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const task = {
  id: "1",
  name: "do dishes",
  completed: false,
}

export default function App() {
  const [Task, setTask] = useState([])

  const fetchTasks = () => {
    try {
      const { data } = axios.get(); //pass in url or api
    } catch (error) {
      
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm/>
      <Task task={task}/>
    </ThemeProvider>
  );
}
