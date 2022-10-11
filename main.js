const STORAGE_KEY = 'todo-list'
const todoStorage = {
  fetch: function() {
    const todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
const app = new Vue({
  el: '#app',
  data: {
    todos: todoStorage.fetch(),
    editableId: null
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  methods: {
    addTask: function() {
      const content = this.$refs.content
      if (!content) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        content: content.value
      })
      content.value = ''
    },
    editTask: function(todo) {
      this.editableId = todo.id
      },
    completedEditTask: function() {
      this.editableId = null
    },
    deleteTask: function(todo) {
      const index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
    }
  }
})
