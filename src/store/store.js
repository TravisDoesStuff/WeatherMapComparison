import Vue from 'vue'
import Vuex from 'vuex'

import weatherFilter from '../data/filters/weather';

Vue.use(Vuex);

const state = {
  homeData: {
    isLoaded: false,
    address: '',
    weather: {},
    climate: '',
    elevation: {},
    daylight: {}
  },
  awayData: {
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
  },
  awayData: state => {
    return state.awayData
  }
}

const mutations = {
  setHomeWeather(state, data) {
    state.homeData.weather = Object.keys(data)
      .filter(key => weatherFilter.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: data[key]
        }
      }, {});
    state.homeData.isLoaded = true;
  },
  setAwayWeather(state, data) {
    state.awayData.weather = Object.keys(data)
      .filter(key => weatherFilter.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: data[key]
        }
      }, {});
    state.awayData.isLoaded = true;
  },
  setHomeAddress(state, data) {
    state.homeData.address = data;
  },
  setAwayAddress(state, data) {
    state.awayData.address = data;
  },
  setHomeClimate(state, data) {
    state.homeData.climate = data;
  },
  setAwayClimate(state, data) {
    state.awayData.climate = data;
  },
  setHomeElevation(state, data) {
    state.homeData.elevation = data;
  },
  setAwayElevation(state, data) {
    state.awayData.elevation = data;
  },
  setHomeDaylight(state, data) {
    state.homeData.daylight = data;
  },
  setAwayDaylight(state, data) {
    state.awayData.daylight = data;
  },
  clearHomeData() {
    state.homeData = {
      isLoaded: false,
      address: '',
      weather: {},
      climate: '',
      daylight: {}
    }
  },
  clearAwayData() {
    state.awayData = {
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
