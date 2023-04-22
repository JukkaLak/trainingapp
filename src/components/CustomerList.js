import React, { useState, useEffect } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from "ag-grid-react";
import  Button  from "@mui/material/Button";
import  AppBar  from "@mui/material/AppBar";
import  Snackbar from "@mui/material/Snackbar";
import  Toolbar from "@mui/material/Toolbar";
import  Typography from "@mui/material/Typography";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { API_URL } from "../constants";

function Customerlist(){
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const [collumnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} params={params.data} />,
        width: 120
    },
    {cellRenderer: params => <Button size="small" color="error" onClick={() => deleteCustomer(params)}>Delete</Button>, width: 120}  

    ])

    useEffect(() => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }, []);






const getCustomers = () => {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => setCustomers(data._embedded.customers))
    .catch(err => console.error(err))
}

const deleteCustomer = (params) => {
    if (window.confirm('Are you sure?')){
        fetch(params.data.links[0].href, { method: 'DELETE' })
        .then(response => {
            if (response.ok){
                setMsg('Customer deleted')
                setOpen(true);
                getCustomers();
            }

            else
            alert('Error' + response.status);
        })
        .catch(err => console.error(err))
    }
}

    const addCustomer = (customer) => {
        fetch(API_URL, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok)
            getCustomers();
            else
            alert('Error');
        })
        .catch(err => console.error(err))
}


    const updateCustomer = (url, updateCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json'},
            body : JSON.stringify(updateCustomer)
        })
        .then(response => {
            if (response.ok){
                setMsg('Update successed');
                setOpen(true)
                getCustomers();
            }
            else
            alert('Error' + response.statusText);
        })
        .catch(err => console.error(err))
}

    return(
        <>
        <AddCustomer addCustomer={addCustomer}/>
        <div className='ag-theme-material' style={{height: 600, width: '90%', margin: 'auto'}}
        >
            <AgGridReact
            pagination={true}

            rowData={customers}
            columnDefs={collumnDefs}
            />

        </div>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={msg}
        />
        </>
    );

    


    } 
export default Customerlist;

