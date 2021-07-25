import axios from 'axios';

const API = axios.create({ baseURL: 'https://localhost:3000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchTorneo = (id) => API.get(`/torneos/${id}`);
export const fetchTorneos = (page) => API.get(`/torneos?page=${page}`);
export const fetchTorneosBySearch = (searchQuery) => API.get(`/torneos/search?searchQuery=${searchQuery.search || 'none'}`);
export const createTorneo = (newTorneo) => API.post('/torneos', newTorneo);
export const likeTorneo = (id, name) => API.patch(`/torneos/${id}/likeTorneo`, name);
export const participar = (id, name) => API.patch(`/torneos/${id}/participar`, name);

export const agregarJugador = (id) => API.patch(`/torneos/${id}/agregarJugador`);
export const comentar = (value, id) => API.post(`/torneos/${id}/comentar`, { value });

export const updateTorneo = (id, updatedTorneo) => API.patch(`/torneos/${id}`, updatedTorneo);
export const iniciarTorneo = (id, rondas) => API.post(`/torneos/${id}/iniciarTorneo`, { rondas });
export const deleteTorneo = (id) => API.delete(`/torneos/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);