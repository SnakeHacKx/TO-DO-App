import Task from "./task.js";

class Tasks {
  _tasksList = {};

  get listArray() {
    const list = [];
    Object.keys(this._tasksList).forEach((key) => {
      list.push(this._tasksList[key]);
    });

    return list;
  }

  constructor() {
    this._tasksList = {};
  }

  deleteTask(id = '') {
    if (this._tasksList[id]) { 
      delete this._tasksList[id];
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((tasks) => {
      this._tasksList[tasks.id] = tasks;
    });
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._tasksList[task.id] = task;
  }

  listAllTasks() {
    console.log();
    this.listArray.forEach((task, i) => {
      const index = `${i + 1}`.green;
      const { description, completedAt } = task;
      const state = completedAt ? "Completada".green : "Pendiente".red;

      console.log(`${index} ${description} :: ${state}`);
    });
  }

  listCompletedAndPendingTasks(showCompleted = true) {
    console.log();
    let counter = 0;
    this.listArray.forEach((task) => {
      const { description, completedAt } = task;

      if (showCompleted && completedAt) {
        counter += 1;
        console.log(`${(counter + '.').green} ${description} :: ${completedAt}`);
      } else if (!showCompleted && !completedAt) {
        counter += 1;
        console.log(`${(counter + '.').green} ${description} :: ${completedAt}`);
      }
    });
  }

  toggleCompleted(ids = []) { 
    ids.forEach((id) => { 
      const task = this._tasksList[id];
      if (!task.completedAt) { 
        task.completedAt = new Date().toISOString();
      }
    });

    this.listArray.forEach((task) => { 
      if (!ids.includes(task.id)) { 
        this._tasksList[task.id].completedAt = null;
      }
    });
  }
}

export default Tasks;
