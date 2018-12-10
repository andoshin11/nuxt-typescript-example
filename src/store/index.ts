import Vuex from 'vuex'

// modules

export interface RootState {}

export default () =>
  new Vuex.Store<RootState>({
    modules: {}
  })
