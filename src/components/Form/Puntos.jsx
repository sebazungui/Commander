import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Select, InputLabel, DropdownButton, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import { createTorneo, updateTorneo } from '../../actions/torneos';
import useStyles from './styles';

const Puntos = () => {
    const { torneo, isLoading } = useSelector((state) => state.torneos);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [jugador, setJugador] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    const handleChange = (event) => {
        setJugador(event.target.value);        
    };
    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Añadir Puntuación</Typography>                
                
                <Select title="Jugadores" className="m-b m-t" id="jugadores" 
                value={jugador.name}
                onChange={handleChange}>               
                    {torneo.likes.map((jugador, i) =>
                        <MenuItem key={i}>{jugador.name}</MenuItem>)}
                </Select>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Enviar</Button>
            </form>
        </Paper>
    )
}

export default Puntos
