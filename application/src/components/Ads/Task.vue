<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-card-media></v-card-media>
          <v-card-text>
            <h1 class="text--primary">{{task.title}}</h1>
            <p>{{task.description}}</p>
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="warning">Редактировать</v-btn>
            <v-btn class="success">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {}
    },
    computed: {
    task() {
      const id = this.id
      //return this.$store.getters.tasks;
      return this.$store.getters.getTaskById(id)
    },
    loading() {
      // не работает прелоадер
      return this.$store.getters.loading;
    }
  },
    created() {
    //this.$store.dispatch("getMyTasks");
    this.$store.dispatch("getAll");
    
  }
  }
</script>
