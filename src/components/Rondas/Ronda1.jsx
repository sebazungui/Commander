import React from 'react'
import { getTorneo } from '../../actions/torneos';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, CircularProgress, Divider, TextField } from '@material-ui/core/';


const Ronda1 = () => {

    const { torneo, isLoading } = useSelector((state) => state.torneos);
    const classes = useStyles();
    const ronda1 = torneo.rondas[0];

    const DosMesas = () => {
        return <ul className={classes.ul}>
            <Typography variant="h4">Mesa 1</Typography>
            {ronda1.Mesas[0].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
            <Typography variant="h4">Mesa 2</Typography>
            {ronda1.Mesas[1].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
        </ul>
    }

    const TresMesas = () => {
        return <ul>
            <Typography variant="h4">Mesa 1</Typography>
            {ronda1.Mesas[0].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
            <Typography variant="h4">Mesa 2</Typography>
            {ronda1.Mesas[1].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
            <Typography variant="h4">Mesa 3</Typography>
            {ronda1.Mesas[2].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
        </ul>
    }

    const CuatroMesas = () => {
        return <ul>
            <Typography variant="h4">Mesa 1</Typography>
            {ronda1.Mesas[0].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
            <Typography variant="h4">Mesa 2</Typography>
            {ronda1.Mesas[1].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
            <Typography variant="h4">Mesa 3</Typography>
            {ronda1.Mesas[2].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
            <Typography variant="h4">Mesa 4</Typography>
            {ronda1.Mesas[3].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
        </ul>
    }

    const CincoMesas = () => {
        return <ul>        
            <Typography variant="h4">Mesa 1</Typography>
            {ronda1.Mesas[0].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
            <Typography variant="h4">Mesa 2</Typography>
            {ronda1.Mesas[1].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
            <Typography variant="h4">Mesa 3</Typography>
            {ronda1.Mesas[2].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
            <Typography variant="h4">Mesa 4</Typography>
            {ronda1.Mesas[3].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
            <Typography variant="h4">Mesa 4</Typography>
            {ronda1.Mesas[4].Participantes.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })}
        </ul>
    }

    return (
        <div>
        <Typography variant="h2">Ronda 1</Typography>
            {(ronda1.Mesas.length === 2) && (
                <DosMesas />
            )}
            {(ronda1.Mesas.length === 3) && (
                <TresMesas />
            )}
            {(ronda1.Mesas.length === 4) && (
                <CuatroMesas />
            )}
            {(ronda1.Mesas.length === 5) && (
                <CincoMesas />
            )}

        </div>
    )
}


export default Ronda1;