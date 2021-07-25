import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { comentar } from '../../actions/torneos';

import useStyles from './styles';

const Comentarios = ({ torneo }) => {
    const classes = useStyles();
    const [comentarios, setComentarios] = useState(torneo?.comentarios);
    const [comentario, setComentario] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const comentariosRef = useRef();

    const handleClick = async () => {
        const finalComentario = `${user.result.name}: ${comentario}`;
        const newComentario = await dispatch(comentar(finalComentario, torneo._id));

        setComentarios(newComentario);
        setComentario('');

        comentariosRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Mensajes</Typography>
                    {comentarios?.map((i, k) => (
                        <Typography key={k} gutterBottom variant='subtitle1'>
                            <strong>{i.split(': ')[0]}</strong>
                            {i.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={comentariosRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant='h6'>Comentar</Typography>
                        <TextField
                            fullWidth
                            rows={2}
                            variant="outlined"
                            label="Mensaje"
                            multiline
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comentario} variant="contained" onClick={handleClick} color="primary">
                            Enviar Mensaje
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comentarios;