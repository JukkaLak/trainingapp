import * as React from 'react';
import  Button from '@mui/material/Button';
import  TextField from '@mui/material/TextField';
import  Dialog from '@mui/material/Dialog';
import  DialogActions from '@mui/material/DialogActions';
import  DialogContent from '@mui/material/DialogContent';
import  DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props){
    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''

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
        props.addCustomer(customer);
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                New customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add customer</DialogTitle>
              <DialogContent>

                <TextField
                
                margin="dense"
                label="Firstname"
                value={customer.firstname}
                onChange={e => setCustomer({...customer, firstname: e.target.value})}
                type="email"
                fullWidth
                variant="standard"
                />

                <TextField

                margin="dense"
                label="Lastname"
                value={customer.lastname}
                onChange={e => setCustomer({...customer, lastname: e.target.value})}
                type="email"
                fullWidth
                variant="standard"
                />

                <TextField

                margin="dense"
                label="Streetaddress"
                value={customer.streetaddress}
                onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
                type="email"
                fullWidth
                variant="standard"
                
                />

                <TextField

                margin="dense"
                label="Postcode"
                value={customer.postcode}
                onChange={e => setCustomer({...customer, postcode: e.target.value})}
                type="email"
                fullWidth
                variant="standard"
                
                />

                <TextField

                margin="dense"
                label="City"
                value={customer.city}
                onChange={e => setCustomer({...customer, city: e.target.value})}
                type="email"
                fullWidth
                variant="standard"
                
                />

                <TextField

                margin="dense"
                label="Email"
                value={customer.email}
                onChange={e => setCustomer({...customer, email: e.target.value})}
                type="email"
                fullWidth
                variant="standard"
                
                />

                <TextField

                margin="dense"
                label="Phone"
                value={customer.phone}
                onChange={e => setCustomer({...customer, phone: e.target.value})}
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