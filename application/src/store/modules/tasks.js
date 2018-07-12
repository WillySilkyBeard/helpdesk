import Vue from 'vue' // для глобального использования vuerouter
import axios from 'axios'
const serverAPI = `http://${window.location.hostname}:3001`

class Task {
    constructor(title, description, user) {
        this.title = title
        this.description = description
        this.user = user
    }
}

export default {
    state: {
        tasks: [],
    },
    mutations: {
        createTask (state, payload) {
            state.tasks.push(payload)
        },
        loadTasks(state, payload) {
            state.tasks = payload
        }
        // updateTask(state, { title, description, id }) {
        //     const task = state.tasks.find(a => {
        //         return a.id === id
        //     })

        //     task.title = title
        //     task.description = description
        // }
    },
    actions: {
        async createTask({ commit, state, dispatch, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const newTask = new Task(
                    payload.title,
                    payload.description,
                    payload.user
                )
                
                if (payload.title != '' && payload.description != '') {
                    //axios.post('/api/auth', newTask)
                     await dispatch('getAuthenticationHeader').then(() => {
                        axios.post(`${serverAPI}/api/v1/task`, newTask, {
                            headers: { 'Authorization': getters.getAuthenticationHeader },
                                params: { user_id: getters.getUserId }
                              })
                              .then(res => {
                                commit('setError', res.data.message)
                                //this.getAllClients()
                              })
                              .catch(({response: {data}}) => {
                                commit('setError', data.message)
                              })
                              commit('createTask', {
                                ...newTask
                            })
                    })
                    } else {commit('setError', 'Не все поля заполненны!')}
                commit('setLoading', false)
            } catch (e) {
                console.error("post:api/task: ERROR", e)
                res.status(500).send({ message: "some error" })
                commit('setError', e.message)
                commit('setLoading', false)
            }
        },
        // тупо выберает задачи по Id пользователя
        async getMyTasks ({commit, getters, dispatch}) {
            try {
                await dispatch('getAuthenticationHeader').then(() => {
                    axios.get(`${serverAPI}/api/v1/task`, {
                        headers: { 'Authorization': getters.getAuthenticationHeader },
                            params: { user_id: getters.getUserId }
                        })
                    .then((res) => {
                        commit('loadTasks', res.data)
                    }).catch((err) => {
                        commit('setError', err.message)
                    })
                })
            } catch (e) {
                console.error("post:api/task: ERROR", e)
                res.status(500).send({ message: "some error" })
                commit('setError', e.message)
            } 
        },
        // получает все задачи
        async getAll ({commit, getters, dispatch}) {
            commit('setLoading', true)
            try {
                await dispatch('getAuthenticationHeader').then(() => {
                    axios.get(`${serverAPI}/api/v1/task`, {
                        headers: { 'Authorization': getters.getAuthenticationHeader }
                            //params: { user_id: getters.getUserId }
                        })
                    .then((res) => {
                        commit('loadTasks', res.data)
                    }).catch((err) => {
                        commit('setError', err.message)
                    })
                })
                commit('setLoading', false)
            } catch (e) {
                console.error("post:api/task: ERROR", e)
                res.status(500).send({ message: "some error" })
                commit('setError', e.message)
                commit('setLoading', false)
            } 
        }
    },
    getters: {
        tasks (state) {
            return state.tasks
        },
        tasksId (state) {
            return state.tasks._id
        },
        // показывает задачи залогиненого пользователя
        myTasks(state, getters) {
            return state.tasks.filter(task => {
                return task.user_id === getters.getUserId
            })
        },
         // показывает конкретную задачу по ID задачи
        getTaskById(state) {
            return taskId => {
                return state.tasks.find(task => task._id === taskId)
            }
        }
    }
}