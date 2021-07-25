/* eslint-disable import/no-anonymous-default-export */
import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_TORNEO, ADD, INICIAR, PARTICIPAR, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, COMENTAR } from '../constants/actionTypes';

export default (state = { isLoading: true, torneos: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        torneos: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, torneos: action.payload.data };
    case FETCH_TORNEO:
      return { ...state, torneo: action.payload.torneo };
    case LIKE:
      return { ...state, torneos: state.torneos.map((torneo) => (torneo._id === action.payload._id ? action.payload : torneo)) };
    case COMENTAR:
      return {
        ...state, torneos: state.torneos.map((torneo) => {
          if (torneo._id === action.payload._id) {
            return action.payload;
          }
          return torneo;
        })
      }
    case PARTICIPAR:
      return { ...state, torneos: state.torneos.map((torneo) => (torneo._id === action.payload._id ? action.payload : torneo)) };
    case ADD:
      return { ...state, torneos: state.torneos.map((torneo) => (torneo._id === action.payload._id ? action.payload : torneo)) };
    case CREATE:
      return { ...state, torneos: [...state.torneos, action.payload] };
    case UPDATE:
      return { ...state, torneos: state.torneos.map((torneo) => (torneo._id === action.payload._id ? action.payload : torneo)) };
    case INICIAR:
      return { ...state, torneos: state.torneos.map((torneo) => (torneo._id === action.payload._id ? action.payload : torneo)) };
    case DELETE:
      return { ...state, torneos: state.torneos.filter((torneo) => torneo._id !== action.payload) };
    default:
      return state;
  }
};