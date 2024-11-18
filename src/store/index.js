import Vue from 'vue';
import Vuex from 'vuex';

import axios from '@/helpers/axiosInterceptor';
import musicalResources from './resources';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {

  },
  state: {
    resources: [],
    songs: [],
    users: [],
    musicalResourceTypes: [],
    currentUser: window.localStorage.getItem('user')
      ? JSON.parse(window.localStorage.getItem('user'))
      : null,
    loading: 0,
  },
  mutations: {
    setLoading(state, isLoading) {
      console.log();
      if (isLoading) {
        state.loading++;
      } else if (state.loading === 0) {

      } else {
        state.loading--;
      }
    },
    setUsers(state, users) {
      state.users = users;
    },
    setSongs(state, songs) {
      state.songs = songs;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    deletedUser(state, user_id) {
      const index = state.users.map((us) => us.id).indexOf(user_id);
      if (index > -1) {
        state.users.splice(index, 1);
      }
    },
    deletedResource(state, id) {
      const index = state.resources.map((re) => re.id).indexOf(id);
      if (index > -1) {
        state.resources.splice(index, 1);
      }
    },
    setResources(state, payload) {
      state.resources = payload;
    },
    setMusicalResourceTypes(state, payload) {
      state.musicalResourceTypes = payload;
    },
  },
  actions: {
    fetchMusicalResourceTypes(store) {
      const request = axios.get('/api/mr_types');
      request.then((res) => {
        store.commit('setMusicalResourceTypes', res.data);
      });
      return request;
    },
    fetchResources(store) {
      const request = axios.get('/api/musical_resources');
      request.then((res) => {
        store.commit('setResources', res.data);
      });
      return request;
    },
    getResource(store, id) {
      const request = axios.get('/api/musical_resources/', { params: { id } });
      return request;
    },
    fetchSongs(store) {
      const request = axios.get('/api/songs');
      request.then((res) => {
        store.commit('setSongs', res.data);
      });
      return request;
    },
    getUsers(store) {
      const request = axios.get('/api/users');
      request.then((resp) => {
        store.commit('setUsers', resp.data);
      });
      return request;
    },
    deleteUser(store, user_id) {
      const request = axios.delete('/api/users/', { params: { id: user_id } });
      request
        .then((resp) => {
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteResource(store, id) {
      const request = axios.delete('/api/musical_resources/', { params: { id } });
      request
        .then((resp) => {
          store.commit('deletedResource', id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteNew(store, id) {
      const request = axios.delete('/api/news/', { params: { id } });
      request
        .catch((err) => {
          console.log(err);
        });
    },
    deleteShow(store, id) {
      const request = axios.delete('/api/shows/', { params: { id } });
      request
        .catch((err) => {
          console.log(err);
        });
    },
    async login(store, { username, password }) {
      store.commit('setLoading', true);
      let data = null;
      try {
        // le pego al login
        const response = await axios.post('/api/login', {
          username,
          password,
        });

        data = response.data;
        // loggeo al usuario en el navegador
        window.localStorage.setItem('jwt', data.jwt);

        // Consulto por el usuario actual y lo guardo
        const currentUser = await axios.get('/api/users', { params: { username: data.username } });

        window.localStorage.setItem('user', JSON.stringify(currentUser.data));
        store.commit('setCurrentUser', currentUser.data);
        return data;
      } finally {
        store.commit('setLoading', false);
      }
    },
    logout(store) {
      store.commit('setCurrentUser', null);
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('jwt');
    },
    addMusicalResource(store, musicalResource) {
      const request = axios.post('/api/musical_resources', musicalResource);
    },
    addSong(store, song) {
      const request = axios.post('/api/songs', song);
      return request;
    },
  },
  getters: {
    users({ users }) {
      return users;
    },
    songs({ songs }) {
      return songs;
    },
    currentUser({ currentUser }) {
      return currentUser;
    },
    currentUserIsAdmin({ currentUser }) {
      return currentUser.rolesUser.map((rol) => rol.id).includes(1);
    },
    resources({ resources }) {
      return resources;
    },
    musicalResourceTypes({ musicalResourceTypes }) {
      return musicalResourceTypes;
    },
    isLoggedIn({ currentUser }) {
      return currentUser !== null;
    },
    isLoading({ loading }) {
      return loading > 0;
    },
  },
  modules: {

  },
});
