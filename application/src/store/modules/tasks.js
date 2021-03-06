import Vue from 'vue' // для глобального использования vuerouter
import axios from 'axios'
const serverAPI = `http://${window.location.hostname}:3001`

class Task {
    constructor(title, description, department, category, deadline, user) {
        this.title = title
        this.description = description
        this.department = department
        this.category = category
        this.deadline = deadline
        this.user = user
        //this.id = id
    }
}
class EditedTask {
    constructor(title, description, department, category, deadline, id) {
        this.title = title
        this.description = description
        this.department = department
        this.category = category
        this.deadline = deadline
        this.id = id
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
        // создает
        async createTask({ commit, state, dispatch, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const newTask = new Task(
                    payload.title,
                    payload.description,
                    payload.department,
                    payload.category,
                    payload.deadline,
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
        },
        // delete task
        async deleteTask ({commit, getters, dispatch}, payload) {
            commit('setLoading', true)
            try {
                await dispatch('getAuthenticationHeader').then(() => {
                    axios.delete(`${serverAPI}/api/v1/task`, {
                        headers: { 'Authorization': getters.getAuthenticationHeader },
                            params: { user_id: getters.getUserId, _id: payload }
                        })
                    .then((res) => {
                        commit('setError', res.data.message)
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
        },
        // updateTask
        async updateTask ({commit, getters, dispatch}, payload) {
            commit('setLoading', true)

            try {
                const newEditedTask = new EditedTask(
                    payload.title,
                    payload.description,
                    payload.department,
                    payload.category,
                    payload.deadline,
                    payload.id
                )
                await dispatch('getAuthenticationHeader').then(() => {
                    axios.put(`${serverAPI}/api/v1/task/single`, newEditedTask, {
                        headers: { 'Authorization': getters.getAuthenticationHeader },
                            params: { user_id: getters.getUserId }
                        })
                    .then((res) => {
                        commit('setError', res.data.message)
                    }).catch((err) => {
                        commit('setError', err.message)
                    })
                })
                commit('setLoading', false)
            } catch (e) {
                res.status(500).send({ message: "some error" })
                commit('setError', e.message)
                commit('setLoading', false)
            }
        }
        
    },
    getters: {
        // все задачи
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