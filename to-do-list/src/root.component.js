import { useEffect } from "react";
import { useState } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox  from "@mui/material/CheckBox";
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import TextField from "@mui/material/TextField";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Button from '@mui/material/Button';
import { Task } from './classTask';

export default function Root() {
  const localTasks = JSON.parse(localStorage.getItem(`${window.base.day}`));

  const [tasks, setTasks] = useState(localTasks);
  const [taskName, setTaskName] = useState('');
  const [taskId, setTaskId] = useState(0);

  useEffect(() => {
    window.base.subscribe(() => {
      setTasks(JSON.parse(localStorage.getItem(`${window.base.day}`)));
    })},
  []);

// function for complete Task
  const handleToggle = (e) => {
    for(let task of tasks){
    if(task.id == e.target.id){
      if (!task.isChecked) {
        task.isChecked = true;
      } else {
        task.isChecked = false;
      }
    }
    }
    window.base.updateTasks(tasks);
  };
  
// functions for change Task
  const getChangeTask = (e) => () => {
    setTaskId(e.id);
    setTaskName(e.name);
  }
  const changeTask = () => {
    if(taskName){
      if(!taskId){
        const newTask = new Task(Date.now(), taskName);
        tasks.push(newTask);
      }else {
        for(let task of tasks){
          if(task.id === taskId){
            task.name = taskName;
          }
        }
      }

      window.base.updateTasks(tasks);
      setTaskName('');
      setTaskId(0);
    }
  }

// function for delete Task
  const deleteTask = (e) => () => {
    for(let i in tasks){
      if(tasks[i].id === e.id){
        tasks.splice(i, 1)
      }
    }
    window.base.updateTasks(tasks);
  }

  
    return (
      <>
        <Stack sx={{width: 360, marginTop: 1}} direction="row" spacing={0}>
          <TextField
          sx={{width: "80%"}}
          id="outlined-basic"
          variant="outlined"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          label="New Task"
          />
          <Button variant="contained" color="success" onClick={changeTask}>
            <BeenhereIcon fontSize="large" />
          </Button>
        </Stack>
          
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          
          {tasks.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value.id}`;
            return (
              <ListItem
                direction ="row"
                sx={{borderBottom: '1px solid black'}}
                key={value.id}
                disablePadding
              >
                <ListItemText sx={{paddingLeft: 1, wordWrap: 'break-word'}} id={labelId} primary={value.name} />
            
                <Stack direction="row" spacing={0}>
                  <Checkbox
                    id={`${value.id}`}
                    edge="center"
                    onChange={e => handleToggle(e)}
                    checked={value.isChecked}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />

                  <IconButton
                  aria-label="delete"
                  onClick={deleteTask(value)}
                  >
                    <DeleteIcon />
                  </IconButton>
                    
                  <IconButton
                  aria-label ="mode"
                  onClick={getChangeTask(value)}
                  >
                    <ModeIcon id={value.id}/>
                  </IconButton>
                </Stack>
              </ListItem>
            );
          })}

        </List>
      </>
    );
}