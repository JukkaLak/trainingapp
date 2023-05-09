import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import './App.css';
import Customerlist from './components/CustomerList';
import TrainingList from './components/TrainingList';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';


function App() {

  const [value, setValue] = useState('');
  const handleChange = (event, value) => {
    setValue(value)
  }


  return (
    <div className="App">
      <AppBar position="static">
      <Toolbar>
        <Typography variant='h6'>Personal trainer app</Typography>
        
        
        </Toolbar>
      </AppBar>

      <Tabs value={value} onChange={handleChange} centered>
        <Tab value="Customers" label="Customers"/>
        <Tab value="Trainings" label="Trainings"/>
      </Tabs>
      {value === 'Customers' && <div><Customerlist/></div>}
      {value === 'Trainings' && <div><TrainingList/></div>}
         
      
    </div>
  );
}

export default App;
