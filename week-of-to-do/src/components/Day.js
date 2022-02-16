
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';

const dayNames = ['Костыль','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']

export default function Day({day}) {

  //create localStorage of day 
  if (!localStorage.getItem(`${day}`)) {
      localStorage.setItem(`${day}`, JSON.stringify([]));
    }

  const [dayTasks, newDayTasks] = useState(JSON.parse(localStorage.getItem(`${day}`)));
    
  useEffect(() => window.base.subscribe(() => {
    if(day === window.base.day){
      newDayTasks(JSON.parse(localStorage.getItem(`${window.base.day}`)))
    }
  }),[]);

// some deals for count complete Tasks of day
  let countTasks = dayTasks.length;
  let completeTasks = 0;
  if(!!countTasks) {
    for(let task of dayTasks) {
      if(task.isChecked){
        completeTasks++;
      }
    }
  }
  let completeProgress = completeTasks && completeTasks/countTasks*100;


  const boxStyle = {
    flexGrow: 1,
    width: 330,
    bgcolor: 'background.paper',
    padding: 2
    }
  
  if(day != 7){
    boxStyle.borderBottom = '1px solid #1a90ff';
  }

// function for progress line (MUI)
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  return (
    <Box
    key={day}
    sx={boxStyle}
    >
      <Button
      sx={{width: '100%', border: '1px solid transparent'}}
      variant="outlined"
      onClick={() => window.base.setDay(day)}
      >
        {`${dayNames[day]} ${completeTasks}/${countTasks}`}
      </Button>

      <BorderLinearProgress variant="determinate" value={completeProgress} />
    </Box>
  )
}