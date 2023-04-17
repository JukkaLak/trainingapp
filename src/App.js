import { AppBar, Toolbar, Typography } from '@mui/material';
import './App.css';
import Customerlist from './components/CustomerList';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
      <Toolbar>
        <Typography variant='h6'>Personal trainer app</Typography>
      </Toolbar>
      </AppBar>
      <Customerlist />
    </div>
  );
}

export default App;
