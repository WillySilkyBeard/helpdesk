import Vue from 'vue' // для глобального использования vuerouter
import axios from 'axios'

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
        auth({ commit }, { email, password, repassword }) {
            console.log('email, password, repassword =', email, password, repassword)

            if (password === repassword || !repassword) {
                axios.post('/api/auth', {
                    email, password
                }).then((res) => {
                    console.log(res.data)

                }).catch((err) => {
                    console.log(err)
                })
            } else {
                console.log('Пароли не совпадают')
            }
        },
        getTasks({ commit }) {
            Vue.http.get('http://localhost:5000/api/task/all')
            .then((res) => {
                commit('loadTasks', res.data)
            }).catch((err) => {
                commit('setError', err.message)
            })
        },
        createTask({ commit }, payload) {
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
                    Vue.http.post('http://localhost:5000/api/task', newTask)
                    .then((res) => {
                        console.log(res.data)
                    }).catch((err) => {
                        console.log(err)
                    })
                    commit('createTask', {
                        ...newTask
                      })
                }
                commit('setLoading', false)
                commit('setError', 'Задача успешно добавлена')
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