import Vue from 'vue'
import Vuex from 'vuex'

import weatherFilter from '../data/filters/weather';

Vue.use(Vuex);

const state = {
  homeData: {
    weather: {},
    daylight: {}
  },
  awayData: {
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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
});
