<template>

    <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
      <v-progress-circular
        indeterminate
        :size="100"
        :width="4"
        color="blue"
      ></v-progress-circular>
    </v-flex>
    <v-data-table
      v-else-if="!loading"
      :headers="headers"
      :items="tasks"
      hide-actions
      class="elevation-3"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.user_id }}</td>
        <td class="text-xs-left"><v-btn flat icon color="green" :to="'/task/'+props.item._id"><v-icon dark>list</v-icon></v-btn></td>
      </template>
    </v-data-table>

</template>

<script>
/* eslint-disable no-alert, no-console */
export default {
  data() {
    return {
      headers: [
        { text: "Название", sortable: true, value: "name" },
        { text: "Создан", value: "date" },
        { text: "Постановщик", value: "user" },
        { text: "Menu", value: "menu" }
      ]
    };
  },
  computed: {
    tasks() {
      //return this.$store.getters.tasks;
      return this.$store.getters.myTasks
    },
    loading() {
      // не работает прелоадер
      return this.$store.getters.loading;
    }
  },
  created() {
    console.log('loading>>>>>>', this.loading)
    
    //this.$store.dispatch("getMyTasks");
    this.$store.dispatch("getAll");
    
  }
};
</script>
