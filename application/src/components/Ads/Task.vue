<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-card-media></v-card-media>
          <v-card-text>
            <v-layout d-flex>
            <v-flex xs8>
            <h1 class="text--primary">{{task.title}}</h1>
            <p>{{task.description}}</p>
            </v-flex>
            <v-flex xs4>
              <p class="text-xs-right grey--text">Крайний срок: {{deadlineDate}}</p>
              <p class="text-xs-right grey--text">Постановщик: {{task.user_id}}</p>
              <p class="text-xs-right grey--text">Департамент: {{task.department}}</p>
              <p class="text-xs-right grey--text">Категория: {{task.category}}</p>
            </v-flex>
            </v-layout>
            </v-card-text>
          <v-card-actions>
            <p class="grey--text">Дата постановки: {{productionDate}}</p>
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
import EditTaskModal from "./EditTaskModal";
export default {
  props: ["id"],
  components: {
    addEditTaskModal: EditTaskModal
  },
  data() {
    return {};
  },
  methods: {
    delItem() {
      //const id = this.id
      this.$store
        .dispatch("deleteTask", this.id)
        .then(() => {
          this.$router.push("/list");
        })
        .catch(() => {});
    },
    splitString(stringToSplit, separator) {
      if (stringToSplit) {
        const [year, month, daytime] = stringToSplit.split(separator);
        let day = daytime.substr(0, 2);
        let time = daytime.substr(3, 8);
        return `${day}.${month}.${year} ${time}`;
      }
    }
  },
  computed: {
    task() {
      const id = this.id;
      //return this.$store.getters.tasks;
      return this.$store.getters.getTaskById(id);
    },
    productionDate() {
      let date = this.task.date;
      return this.splitString(date, "-");
    },
    deadlineDate() {
      let date = this.task.deadline;
      return this.splitString(date, "-");
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
};
</script>
