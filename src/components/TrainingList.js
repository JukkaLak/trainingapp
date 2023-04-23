import React, { useState, useEffect } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from "ag-grid-react";
import  Button  from "@mui/material/Button";
import  AppBar  from "@mui/material/AppBar";
import  Snackbar from "@mui/material/Snackbar";
import  Toolbar from "@mui/material/Toolbar";
import  Typography from "@mui/material/Typography";
import AddTraining from "./AddTraining";
import EditTraining from "./EditTraining";
import { API_URL_TRAININGS } from "../constants";

function TrainingList() {
    const [trainigs, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const [collumnDefs] = useState([
        {field: 'customer', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {cellRenderer: params => <EditTraining updateTraining={updateTraining} params={params.data}/>,
        width: 120
    },
    {cellRenderer: params => <Button size="small" color="error" onClick={() => deleteTraining(params)}>Delete</Button>, width: 120}

    ])

    useEffect(() => {
        fetch('http://traineeapp.azurewebsites.net/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }, []);

    const getTrainings = () => {
        fetch(API_URL_TRAININGS)
        .then(response => response.json())
        .then(data = setTrainings(data._embedded.trainigs))
        .catch(err => console.error(err))
    }

    const deleteTraining = (params) => {
        if (window.confirm('Are you sure')){
            fetch(params.data.links[0].href, {method: 'DELETE'})
            .then(response => {
                if (response.ok){
                    setMsg('Training deleted')
                    setOpen(true);
                    getTrainings();
                }

                else
                alert('Error' + response.status);
            })
            .catch(err => console.error(err))
        }
    }

    const addTraining = (training) => {
        fetch(API_URL_TRAININGS, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok)
            getTrainings();
            else
            alert('Error');
        })
        .catch(err => console.error(err))
    }

    const updateTraining = (url, updateTraining) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(updateTraining)
        })
        .then(response => {
            if (response.ok){
                setMsg('Update sucessed');
                setOpen(true)
                getTrainings();
            }
            else
            alert('Error' + response.statusText);
        })
        .catch(err => console.error(err))
    }

    return(
        <>
        <AddTraining addTraining={addTraining}/>
        <div className='ag-theme-material' style={{height: 600, width: '90%', margin: 'auto'}}
        >
            <AgGridReact
            pagination={true}

            rowData={trainigs}
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

export default TrainingList;