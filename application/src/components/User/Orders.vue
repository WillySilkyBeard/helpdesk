<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <h1>Задачи</h1>
        <input type="text" v-model="title">
        <input type="text" v-model="description">
        <button @click="clog">send</button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: 'я титул',
        description: 'я текст'
      }
    },
    methods: {
      clog () {
        const task = {
          title: this.title,
          description: this.description
        }
        this.$http.post('http://localhost:5000/api/task', task)
        .then(Response => {
          console.log(Response)
        })
      }
    }
  }
</script>
