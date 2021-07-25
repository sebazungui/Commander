import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import { createTorneo, updateTorneo } from '../../actions/torneos';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [torneoData, setTorneoData] = useState({ title: '', detalle: '', lugar: '', selectedFile: '', fechaTorneo: '' });
  const torneo = useSelector((state) => (currentId ? state.torneos.torneos.find((torneo) => torneo._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setTorneoData({ title: '', detalle: '', lugar: '', selectedFile: '', fechaTorneo: '', });
  };

  useEffect(() => {
    if (!torneo?.title) clear();
    if (torneo) setTorneoData(torneo);
  }, [torneo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createTorneo({ ...torneoData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updateTorneo(currentId, { ...torneoData, name: user?.result?.name }));
      clear();
    }
  };

  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0, 10);

  if (!user?.result?.name || user?.result?.role === 'user') {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Solo administradores pueden crear torneos.
        </Typography>
      </Paper>
    );
  }


  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editar Torneo "${torneo?.title}"` : 'Crear un Torneo'}</Typography>
        <TextField name="title" variant="outlined" label="Nombre Torneo" fullWidth value={torneoData.title} onChange={(e) => setTorneoData({ ...torneoData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Detalle" fullWidth multiline rows={4} value={torneoData.detalle} onChange={(e) => setTorneoData({ ...torneoData, detalle: e.target.value })} />
        <TextField variant="outlined" fullWidth
          id="fechaTorneo"
          label="Fecha Torneo"
          type="date"
          minDate={date}                    
          defaultValue={date}
          inputProps={{ min: date, max: "2025-05-31" }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setTorneoData({ ...torneoData, fechaTorneo: e.target.value })}
        />

        <TextField name="lugar" variant="outlined" label="Lugar" fullWidth value={torneoData.lugar} onChange={(e) => setTorneoData({ ...torneoData, lugar: e.target.value })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setTorneoData({ ...torneoData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Enviar</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Borrar</Button>
      </form>
    </Paper>
  );
};

export default Form;