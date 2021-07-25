import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Paper, Typography, CircularProgress, Container, Card, Divider, Grid, CardContent, Button, TextField } from '@material-ui/core/';
import { getTorneo } from '../../actions/torneos';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Ronda1 from './Ronda1';
import Ronda2 from './Ronda2';
import Ronda3 from './Ronda3';
import Puntos from '../Form/Puntos';
import useStyles from './styles';



const Rondas = () => {
    const { torneo, isLoading } = useSelector((state) => state.torneos);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();  

    useEffect(() => {
        dispatch(getTorneo(id));
    }, [id]);



    if (!torneo) return null;
    if (isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
        </Paper>
    }

    if (!torneo.rondas.length && !isLoading) return <Typography className={classes.textoError}>Torneo no iniciado</Typography>;
    return (
        isLoading ? <CircularProgress /> : (
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <Grid container className={classes.root} spacing={2} >
                    <Grid item xs={4}>
                        <Ronda1 />
                    </Grid>
                    <Grid item xs={4}>
                        <Ronda2 />
                    </Grid>
                    <Grid item xs={4}>
                        <Ronda3 />
                    </Grid>
                </Grid>
            </Paper>
        )
    )

}

export default Rondas;
