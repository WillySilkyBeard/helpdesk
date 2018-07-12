import axios from 'axios'
export default {
    state: {
        user: null
    },
    metations: {},
    actions: {
        auth({ commit }, { email, password, repassword }) {
            console.log('email, password, repassword =', email, password, repassword)

                if(password === repassword || !repassword) {
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
        }
    },
    getters: {}
}