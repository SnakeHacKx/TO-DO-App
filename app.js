import colors from "colors";
import {
  inquirerMenu,
  inquirerPause,
  readInput,
  deleteTaskList,
  confirmDeleteTask,
  showChecklist,
} from "./helpers/inquirer.js";
import Tasks from "./models/tasks.js";
import { saveOnDB, readFromDB } from "./helpers/saveFile.js";

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const dbTasks = readFromDB();

  if (dbTasks) {
    tasks.loadTasksFromArray(dbTasks);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1": // crear nueva tarea
        const desc = await readInput("Descrición:");
        tasks.createTask(desc);
        break;

      case "2": // Mostrar lista de todas las tareas
        tasks.listAllTasks();
        break;

      case "3": // listar tareas completadas
        tasks.listCompletedAndPendingTasks(true);
        break;

      case "4": // listar tareas pendientes
        tasks.listCompletedAndPendingTasks(false);
        break;
      
      case "5": // Completado | pendiente
        const ids = await showChecklist(tasks.listArray);
        tasks.toggleCompleted(ids);
        break;

      case "6":
        const id = await deleteTaskList(tasks.listArray);
        if (id !== "0") {
          const ok = await confirmDeleteTask("¿Estás seguro?");
          if (ok) {
            tasks.deleteTask(id);
            console.log(colors.green(`Tarea eliminada correctamente`));
          }
        }
        break;

      default:
        break;
    }

    saveOnDB(tasks.listArray);

    await inquirerPause();
  } while (opt !== "0");
};

main();
