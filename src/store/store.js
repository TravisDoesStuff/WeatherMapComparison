import Vue from 'vue'
import Vuex from 'vuex'

import weatherFilter from '../data/filters/weather';

Vue.use(Vuex);

const state = {
  homeData: {
    address: '',
    weather: {},
    daylight: {}
  },
  awayData: {
    address: '',
    weather: {},
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
  },
  setHomeAddress(state, data) {
    state.homeData.address = data;
  },
  setAwayAddress(state, data) {
    state.awayData.address = data;
  },
}

export default new Vuex.Store({
  state,
  mutations,
  getters
});
