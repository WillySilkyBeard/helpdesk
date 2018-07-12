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
      v-else
      :headers="headers"
      :items="tasks"
      hide-actions
      class="elevation-3"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.user_id }}</td>
        <td class="text-xs-left">
          <v-menu bottom offset-y>
            <v-btn flat icon color="gray" slot="activator"><v-icon dark>list</v-icon></v-btn>
            <v-list>
              <v-list-tile v-for="(item, i) in menu" :key="i" @click="routerPush(props.item._id)">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </td>
      </template>
    </v-data-table>

</template>

<script>
/* eslint-disable no-alert, no-console */
//flat icon color="green" :to="'/task/'+props.item._id" // кнопка-иконка раньше была
export default {
  data() {
    return {
      headers: [
        { text: "Название", sortable: true, value: "name" },
        { text: "Создан", value: "date" },
        { text: "Постановщик", value: "user" },
        { text: "", value: "menu" }
      ],
      menu: [
        { title: "Открыть", action: "" },
        { title: "Завершить", action: "" },
        { title: "Редактировать", action: "" },
        { title: "Удалить", action: "" }
      ]
    };
  },
  methods: {
    routerPush(payload) {
      this.$router.push({ name: 'task', params: { id: payload }})
    }
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
    //this.$store.dispatch("getMyTasks");
    this.$store.dispatch("getAll");
  }
};
</script>
