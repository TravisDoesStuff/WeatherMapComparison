import Vue from 'vue'
import Vuex from 'vuex'

// import weatherFilter from '../data/filters/weather';

Vue.use(Vuex);

const state = {
  homeData: {
    isLoaded: false,
    address: '',
    weather: {},
    climate: '',
    elevation: {},
    daylight: {}
  }
}

const getters = {
  homeData: state => {
    return state.homeData
  }
}

const mutations = {
  setHomeWeather(state, data) {
    state.homeData.weather = data.data;
    state.homeData.isLoaded = true;
  },
  setHomeAddress(state, data) {
    state.homeData.address = data;
  },
  setHomeClimate(state, data) {
    state.homeData.climate = data;
  },
  setHomeElevation(state, data) {
    state.homeData.elevation = data;
  },
  setHomeDaylight(state, data) {
    state.homeData.daylight = data;
  },
  clearHomeData() {
    state.homeData = {
      isLoaded: false,
      address: '',
      weather: {},
      climate: '',
      daylight: {}
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
});
