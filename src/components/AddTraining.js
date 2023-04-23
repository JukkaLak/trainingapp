import * as React from 'react';
import  Button from '@mui/material/Button';
import  TextField from '@mui/material/TextField';
import  Dialog from '@mui/material/Dialog';
import  DialogActions from '@mui/material/DialogActions';
import  DialogContent from '@mui/material/DialogContent';
import  DialogTitle from '@mui/material/DialogTitle';

export default function AddTraining(props){
    const [training, setTraining] = React.useState({
        
        date: '',
        duration: '',
        activity: ''

    })
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick')
        setOpen(false);
    };

    const handleSave = () => {
        props.AddTraining(training);
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                New Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>

                    <TextField
                    
                    margin="dense"
                    label="Date"
                    value={training.date}
                    onChange={e => setTraining({...training, date: e.target.value})}
                    type="email"
                    fullWidth
                    variant="standard"
                    />

                    <TextField
                    
                    margin="dense"
                    label="Duration"
                    value={training.duration}
                    onChange={e => setTraining({...training, duration: e.target.value})}
                    type="email"
                    fullWidth
                    variant="standard"
                    />

                    <TextField

                    margin="dense"
                    label="Activity"
                    value={training.activity}
                    onChange={e => setTraining({...training, activity: e.target.value})}
                    type="email"
                    fullWidth
                    variant="standard"
                    
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
                    
            </Dialog>
        </div>
    )
}