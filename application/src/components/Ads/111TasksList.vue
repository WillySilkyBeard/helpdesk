<template>
  <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
    <v-progress-circular
        indeterminate
        :size="100"
        :width="4"
        color="blue"
    ></v-progress-circular>
  </v-flex>
  <div v-else>
  <v-toolbar flat color="white">
      <v-toolbar-title>Мои задачи</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-btn color="primary" dark class="mb-2" @click="doNewTask">Создать задачу</v-btn>
  </v-toolbar>
  <v-data-table
      :headers="headers"
      :items="tasks"
      :loading="loading"
      item-key="title"
      rows-per-page-text="На странице"
      no-data-text="На сегодня ничего нет"
      class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td @click="openItem(props.item._id)">{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.user_id }}</td>
        <td class="text-xs-left">
          <v-menu bottom offset-y>
            <v-btn flat icon color="gray" slot="activator"><v-icon dark>list</v-icon></v-btn>
            <v-list>
              <v-list-tile @click="openItem(props.item._id)">
                <v-list-tile-title>Открыть</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="openItem(props.item._id)">
                <v-list-tile-title>Завершить</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="editItem(props.item)">
                <v-list-tile-title>Редактировать
                  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <v-card>
                      <v-toolbar dark color="primary">
                        <v-btn icon dark @click.native="dialog = false">
                          <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Редактирование</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <v-btn dark flat @click.native="onSave(editedItem)">Сохранить</v-btn>
                        </v-toolbar-items>
                      </v-toolbar>
                      <v-layout row>
                        <v-flex xs12>
                          <v-card-text>
                            <v-text-field
                            name="title" 
                            label="Title" 
                            type="text"
                            v-model="editedItem.title"
                            ></v-text-field>
                            <v-text-field
                            name="description" 
                            label="description" 
                            type="text"
                            multi-line
                            v-model="editedItem.description"
                            ></v-text-field>
                          </v-card-text>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-dialog>
                </v-list-tile-title>  
              </v-list-tile>
              <v-list-tile @click="deleteItem(props.item._id)">
                <v-list-tile-title>Удалить</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>
          <div><strong>Краткое описание:</strong><br>{{props.item.description}}</div>
          <!-- <v-btn flat @click="openItem(props.item._id)">
            <v-icon small class="mr-2">remove_red_eye</v-icon>1Просмотреть
          </v-btn>
        <v-btn flat @click="openItem(props.item._id)">
          <v-icon small class="mr-2">check_box</v-icon>Завершить
        </v-btn>
        <v-btn flat @click.stop="editItem(props.item)">
          <v-icon small class="mr-2">edit</v-icon>Редактировать
        </v-btn>
        <v-btn flat @click="deleteItem(props.item._id)">
          <v-icon small class="mr-2">delete</v-icon>Удалить
        </v-btn> -->
        </v-card-text>
      </v-card>
    </template>
    <!-- пагинация -->
    <template slot="pageText" slot-scope="props">
      {{ props.pageStart }} - {{ props.pageStop }} из {{ props.itemsLength }}
    </template>
  </v-data-table>
  </div>
</template>

<script>
/* eslint-disable no-alert, no-console */
export default {
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        _id: '',
        date: '',
        title: '',
        description: '',
        user_id: ''
      },
      headers: [
        { text: "Название", sortable: false, value: "name" },
        { text: "Создан", value: "date" },
        { text: "Постановщик", value: "user" },
        { text: "", sortable: false, value: "menu" }
      ]
    };
  },
  methods: {
    openItem (payload) {
      this.$router.push({ name: 'task', params: { id: payload }})
    },
    editItem (payload) {
      this.editedIndex = this.tasks.indexOf(payload)
      this.editedItem = Object.assign({}, payload)
      this.dialog = true
    },
    deleteItem (payload) {
      this.$store.dispatch("deleteTask", payload);
      this.$store.dispatch("getAll");
    },
    onCancel() {
        this.editedDescription = this.task.description
        this.editedTitle = this.task.title
        this.dialog = false
    },
    onSave(payload) {
      if(this.editedDescription !== '' && this.editedTitle !== '') {
          const id = payload._id
          this.$store.dispatch('updateTask', {
              title: payload.title,
              description: payload.description,
              id: id
          })
          .then(() => {
          this.$router.push("/list") 
          })
          .catch(() => {})
          this.$store.dispatch("getAll");
          this.dialog = false
      }
    },
    doNewTask() {
       this.$router.push("/new")
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
      // return this.$store.getters.myTasks
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
