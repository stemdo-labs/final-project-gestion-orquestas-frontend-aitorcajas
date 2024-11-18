import axios from '@/helpers/axiosInterceptor'
export default {
    state: {
      resources: [],
      songs: [],
      musicalResourceTypes: [],
    },
    mutations: {
      setSongs(state, songs) {
        state.songs = songs;
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
          store.commit('setMusicalResourceTypes', res.data);;
        });
        return request;
      },
      fetchResources(store) {
        const request = axios.get('/api/musical_resources');
        request.then((res) => {
          store.commit('setResources', res.data);;
        });
        return request;
      },
      fetchSongs(store) {
        const request = axios.get('/api/songs');
        request.then((res) => {
          store.commit('setSongs', res.data);;
        });
        return request;
      },
    },
    getters: {
      resources({ resources }) {
        return resources;
      },
      musicalResourceTypes({musicalResourceTypes}) {
        return musicalResourceTypes;
      }
    }
  };
  