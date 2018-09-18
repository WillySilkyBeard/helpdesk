<template>
<div>

<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn flat slot="activator"><v-icon>edit</v-icon></v-btn>
        <v-card>
            <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="dialog = false">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Редактирование</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click.native="onSave">Сохранить</v-btn>
            </v-toolbar-items>
            </v-toolbar>
            <v-layout row>
            <v-flex xs12>
                <v-card-text>
                <v-select
                :items="departmentList"
                label="Выберите отдел"
                outline
                v-model="editedDepartment"
                ></v-select>
                <v-select
                :items="categoryList"
                label="Выберите категорию"
                outline
                v-model="editedCategory"
                ></v-select>
                <v-menu
                ref="menu2"
                :close-on-content-click="false"
                v-model="dateModal"
                :nudge-right="40"
                :return-value.sync="editedDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                >
                <v-text-field
                    slot="activator"
                    v-model="editedDate === null ? deadline : editedDate"
                    label="Крайний срок"
                    prepend-icon="event"
                    readonly
                    ></v-text-field>
                    <v-date-picker
                    v-model="editedDate"
                    @input="$refs.menu2.save(editedDate)"
                    locale="ru-ru"
                    first-day-of-week ="1"
                    ></v-date-picker>
                </v-menu>
                <v-text-field
                name="title" 
                label="Title" 
                type="text"
                v-model="editedTitle"
                ></v-text-field>
                <v-text-field
                name="description" 
                label="description" 
                type="text"
                multi-line
                v-model="editedDescription"
                ></v-text-field>
                </v-card-text>
            </v-flex>
            </v-layout>
            {{deadline}}
            {{editedDate === null ? 'nul' : editedDate}}
            {{editedDateFormatted === null ? 'nul' : editedDateFormatted}}
        </v-card>
        </v-dialog>
</div>
</template>

<script>
/* eslint-disable no-alert, no-console */
export default {
  props: ["task"],
  data() {
    return {
      dialog: false,
      dateModal: false,
      editedDescription: this.task.description,
      editedTitle: this.task.title,
      departmentList: ['ИТ', 'Бухгалтерия', 'Администрация', 'Кадры'],
      categoryList: ['Новый пользователь', 'Установка/Настройка ПО', 'Замена картриджа', 'Другое'],
      editedDepartment: this.task.department,
      editedCategory: this.task.category,
      editedDateFormatted: null,
      editedDate: null
    }
  },
  computed: {
      // перевел дату в нужный формат и получил
      deadline() {
        let [year, month, daytime] = this.task.deadline.split("-");
        let day = daytime.substr(0, 2);
        let time = daytime.substr(3, 8);
        // return `${year}-${month}-${day}`;
        return `${day}/${month}/${year}`;
    }
  },
  methods: {
    onCancel() {
      this.editedDescription = this.task.description;
      this.editedTitle = this.task.title;
      this.editedDepartment = this.task.department;
      this.editedCategory = this.task.category;
      this.dialog = false;
      this.editedDate = this.task.deadline;
    },
    onSave() {
      if (this.editedDescription !== "" && this.editedTitle !== "") {
        // const id = this.task._id;
        const newDeadline = this.editedDate == null ? this.deadline : this.editedDate
        console.log(this.editedDate)
        console.log(newDeadline)

        this.$store
          .dispatch("updateTask", {
            title: this.editedTitle,
            description: this.editedDescription,
            department: this.editedDepartment,
            category: this.editedCategory,
            deadline: newDeadline,
            id: this.task._id
          })
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {});

        this.dialog = false;
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = editedDate.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = editedDate.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  watch: {
    editedDate(val) {
      this.editedDateFormatted = this.formatDate(this.editedDate);
    }
  }
};
</script>

