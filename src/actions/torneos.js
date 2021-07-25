import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_TORNEO, INICIAR, PARTICIPAR, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMENTAR } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const getTorneo = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchTorneo(id);
    dispatch({ type: FETCH_TORNEO, payload: { torneo: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getTorneos = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchTorneos(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getTorneosBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchTorneosBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { torneo: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createTorneo = (torneo, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createTorneo(torneo);

    dispatch({ type: CREATE, payload: data });

    history.push(`/torneos/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateTorneo = (id, torneo) => async (dispatch) => {
  try {
    const { data } = await api.updateTorneo(id, torneo);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const iniciarTorneo = (id, rondas) => async (dispatch) => {
  try {
    const { data } = await api.iniciarTorneo(id, rondas);

    dispatch({ type: INICIAR, payload: data });
    return data.rondas;
  } catch (error) {
    console.log(error);
  }
};


export const likeTorneo = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likeTorneo(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};



export const comentar = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comentar(value, id);

    dispatch({ type: COMENTAR, payload: data });

    return data.comentarios;
  } catch (error) {
    console.log(error);
  }
}

export const deleteTorneo = (id) => async (dispatch) => {
  try {
    await api.deleteTorneo(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const participar = (id, torneo) => async (dispatch) => {
  try {
    const { data } = await api.participar(id, torneo);

    dispatch({ type: PARTICIPAR, payload: data });
  } catch (error) {
    console.log(error);
  }
};
