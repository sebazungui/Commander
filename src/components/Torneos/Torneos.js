import React from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Torneo from './Torneo/Torneo';
import useStyles from './styles';

const Torneos = ({ setCurrentId }) => {
  const { torneos, isLoading } = useSelector((state) => state.torneos);
  const classes = useStyles();

  
  if (!torneos.length && !isLoading) return <Typography className={classes.textoError}>No hay torneos</Typography>;
  return (
       isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {torneos?.map((torneo) => (
          <Grid key={torneo._id} item xs={12} sm={12} md={6} lg={3}>
            <Torneo torneo={torneo} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Torneos;