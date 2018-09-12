import Vue from 'vue' // для глобального использования vuerouter
import axios from 'axios'
const serverAPI = `http://${window.location.hostname}:3001`

export default {
    state: {
        validLogin: false,
        user: { 
            authenticated: false,
            username: '',
            id: ''
        },
        token: null

    },
    mutations: {
        setUsername(state, payload) {
            state.user.username = payload
        },
        setUserId(state, payload) {
            state.user.id = payload
        },
        setValidLogin(state, payload) {
            state.validLogin = payload
        },
        setAuthenticated(state, payload) {
            state.user.authenticated = payload
        },
        getAuthenticationHeader(state, payload) {
            state.token = payload
        }
    },
    actions: {
        authenticate({ commit }, payload) {
            if(payload.username != '' || payload.password != '') {
                axios.post(`${serverAPI}/api/v1/auth`, payload)
                .then(({ data: { token, user } }) => {
                    commit('setAuthenticated', true)
                    Vue.cookie.set('token', token, { expires: '10m' })
                    Vue.cookie.set('user_id', user._id, { expires: '10m' })
                    //this.$cookie.set('token', token, '1D') // не работает
                    commit('setUsername', user.username)
                    commit('setUserId', user._id)
                    //commit('setValidLogin', true)
                    commit('setError', `Добро пожаловать! ${user.username}`)
                })
                .catch(({response: {data}}) => {
                    commit('setError', data.message)
                })
            } else {
                commit('setError', 'Поля логин и пароль не могут быть пустыми')
            }
            
        },
        signup ({dispatch, commit}, payload) {
            if(payload.username != '' || payload.password != '') {
            axios.post(`${serverAPI}/api/v1/signup`, payload)
                .then(() => {
                    dispatch('authenticate', payload)
                }).catch(({response: {data}}) => {
                    commit('setError', data.message)
                })
            } else {
                commit('setError', 'Поля логин и пароль не могут быть пустыми')
            }
          },

        logout({ commit }) {
            Vue.cookie.delete('token');
            Vue.cookie.delete('user_id');
            commit('setUsername', '')
            commit('setAuthenticated', false)
            commit('setError', 'Вы успешно вышли из системы')
        },

        checkAuthentication ({state, commit}) {
            const token = document.cookie // олжно быть чтот вроде  document.cookie['token']
            state.user.authenticated = !!token
            // if (token) commit('setAuthenticated', true)
            // else commit('setAuthenticated', false)
        },
        getAuthenticationHeader ({commit}) {
            commit('getAuthenticationHeader', `Bearer ${Vue.cookie.get('token')}`)
            //return `Bearer ${Vue.cookie.get('token')}`
          }
    },
    getters: {
        validLogin(state) {
            return state.validLogin
        },
        isUserAuthenticated(state) {
            return state.user.authenticated
        },
        getUsername(state) {
            return state.user.username
        },
        getUserId(state) {
            return state.user.id
        },
        getAuthenticationHeader(state) {
            return state.token
        }
        // myTasks(state, getters) { // должна показывать задачи конкретного пользователя
        //     return state.tasks.filter(ad => {
        //         return ad.ownerId === getters.user.id
        //     })
        // },
        // taskById(state) { // получает конкретную задачу по ID
        //     return adId => {
        //         return state.ads.find(ad => ad.id === adId)
        //     }
        // }
    }
}