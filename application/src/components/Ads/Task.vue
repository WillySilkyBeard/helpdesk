<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-card-media></v-card-media>
          <v-card-text>
            <h1 class="text--primary">{{task.title}}</h1>
            <p>{{task.description}}</p>
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="delItem"><v-icon>delete</v-icon></v-btn>
            <add-edit-task-modal :task="task"></add-edit-task-modal>
            <v-btn class="success">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
        <div v-else class="text-xs-center">
          <v-progress-circular
        indeterminate
        :size="100"
        :width="4"
        color="blue"
      ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditTaskModal from './EditTaskModal'
  export default {
    props: ['id'],
    components: {
      addEditTaskModal: EditTaskModal
    },
    data () {
      return {}
    },
    methods: {
      delItem() {
        //const id = this.id
        this.$store.dispatch("deleteTask", this.id)
        .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {})
      }
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
