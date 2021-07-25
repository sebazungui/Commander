import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { likeTorneo, deleteTorneo } from '../../../actions/torneos';
import useStyles from './styles';

const Torneo = ({ torneo, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const Likes = () => {
    if (torneo?.likes?.length > 0) {
      return torneo.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{torneo.likes.length > 2 ? `Tú y ${torneo.likes.length - 1} otros` : `${torneo.likes.length} inscrito${torneo.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{torneo.likes.length} {torneo.likes.length === 1 ? 'Inscrito' : 'Inscritos'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Inscribirse</>;
  };

  const openTorneo = () => {
    // dispatch(getTorneo(torneo._id, history)); 
    history.push(`/torneos/${torneo._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openTorneo}
      >
        <CardMedia className={classes.media} image={torneo.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={torneo.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{torneo.name}</Typography>
          <Typography variant="body2">{moment(torneo.fecha).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === torneo?.creator || user?.result?._id === torneo?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(torneo._id);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{torneo.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{torneo.detalle.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeTorneo(torneo._id))}>
          <Likes />
        </Button>
        {(user?.result?.googleId === torneo?.creator || user?.result?._id === torneo?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteTorneo(torneo._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Torneo;