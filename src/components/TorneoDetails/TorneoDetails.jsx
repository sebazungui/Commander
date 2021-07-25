import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, TextField } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { getTorneo, iniciarTorneo } from '../../actions/torneos';
import useStyles from './styles';
import Comentarios from './Comentarios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const TorneoDetails = ({ currentId, setCurrentId }) => {
  const { torneo, isLoading } = useSelector((state) => state.torneos);
  const [torneoData, setTorneoData] = useState([]);
  const [inscritos, setInscritos] = useState([]);
  const [participantes, setParticipantes] = useState([]);
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getTorneo(id));
  }, [id]);


  const handleClickOpen = () => {
    setOpen(true);
    setParticipantes(torneo.likes);
  };


  const handleClose = () => {
    setOpen(false);
  };

  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  const handleAceptar = () => {
    const myObj = torneo.likes;
    var size = Object.size(myObj);
    const n = size;
    const rondas = [];

    // x=mesas de 4, y=mesas de 3

    let x = n - (3 * Math.ceil(n / 4));
    let y = Math.ceil(n / 4) - x;

    for (let index = 0; index < 3; index++) {

      const Jugadores = torneo.likes.slice();
      // console.log(Jugadores);

      //contador para saber que numero de mesa es, pero tu no lo ocupas,pero aqui se esta ocupando
      let contmesa = 1;

      const mesas = [];

      //for para llenar las mesas de 4 jugadores
      for (let i = 0; i < x; i++) {

        let mesaJ4 = [];

        for (let j = 0; j < 4; j++) {
          var random = Math.floor(Math.random() * ((n - (i * 4)) - j));

          mesaJ4.push(Jugadores[random]);
          Jugadores.splice(random, 1);

        }
        const newMesa4 = { numero: contmesa, Participantes: mesaJ4 };
        ++contmesa;
        mesas.push(newMesa4);
        console.log(newMesa4);
      }

      //for para llenar las mesas de 3 jugadores
      for (let i = 0; i < y; i++) {

        let mesaJ3 = [];
        for (let j = 0; j < 3; j++) {

          var random = Math.floor(Math.random() * ((n - (x * 4 + i * 3)) - j));
          mesaJ3.push(Jugadores[random]);
          Jugadores.splice(random, 1);

        }
        const newMesa3 = { numero: contmesa, Participantes: mesaJ3 };
        ++contmesa;
        mesas.push(newMesa3);
      }
      let num = index + 1;
      const ronda = { numero: num, Mesas: mesas };
      rondas.push(ronda);
    }

    console.log(rondas);
    dispatch(iniciarTorneo(torneo._id, { ...torneoData, rondas }));
    history.push(`/torneos/${torneo._id}/rondas`);
    handleClose();
  }

  const handleRondas = () => {
    history.push(`/torneos/${torneo._id}/rondas`);
  }

  if (!torneo) return null;
  if (isLoading) {
    return <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="7em" />
    </Paper>
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{torneo.title}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="body1" component="p">{torneo.detalle}</Typography>
          <Typography variant="h6">Creado por: {torneo.name}</Typography>
          <Typography variant="body1">Lugar: {torneo.lugar} </Typography>
          <Typography variant="body1">Día del evento: {moment(torneo.fechaTorneo).format('DD/MM/YYYY')}</Typography>
          <Typography variant="body1">{moment(torneo.fecha).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="h5">Inscritos</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {torneo.likes.map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6">{index + 1} {row.name}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider style={{ margin: '20px 0' }} />
          {(user?.result?.role === 'admin' && torneo.likes.length >= 7 && torneo.rondas.length === 0) && (
            <div>
              <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Iniciar Torneo
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"¿Desea iniciar este torneo?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Al aceptar se crearán las mesas respectivas en base a los jugadores inscritos en este momento.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancelar
                  </Button>
                  <Button onClick={handleAceptar} color="primary" autoFocus>
                    Iniciar
                  </Button>
                </DialogActions>
              </Dialog>
            </div>)}
          {(torneo.rondas.length > 1) && (
            <Button onClick={handleRondas} variant="contained" color="primary">Rondas</Button>
          )}
          <Divider style={{ margin: '20px 0' }} />
          <Comentarios torneo={torneo} />
          <Divider style={{ margin: '20px 0' }} />


        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={torneo.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={torneo.title} />
        </div>
      </div>
    </Paper>
  );
};

export default TorneoDetails;