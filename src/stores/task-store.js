import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from 'src/supabase'

function dueDate() {
  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

function dueTime() {
  const date = new Date()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([])
  const newTask = ref('')

  async function fetchTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching tasks:', error)
    } else {
      tasks.value = data
    }
  }

  async function addTask() {
    if (newTask.value !== '') {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          title: newTask.value,
          done: false,
          due_date: dueDate(),
          due_time: dueTime()
        }])
        .select()

      if (error) {
        console.error('Error adding task:', error)
      } else {
        tasks.value.push(data[0])
        newTask.value = ''
      }
    }
  }

  async function deleteTask(taskId) {
    if (!taskId) return
      const existing = tasks.value.find((t) => t.id === taskId)
      if (!existing) return
      tasks.value = tasks.value.filter((t) => t.id !== taskId)
      const { error } = await supabase.from('tasks').delete().eq('id', taskId)
      if (error) {
        tasks.value.push(existing)
      }
  }

  async function alterTask(task) {
    const updated = !task.done
    const { error } = await supabase
      .from('tasks')
      .update({ done: updated })
      .eq('id', task.id)

    if (error) {
      console.error('Error updating task:', error)
    } else {
      task.done = updated
    }
  }

  return { tasks, newTask, fetchTasks, addTask, deleteTask, alterTask }
})
