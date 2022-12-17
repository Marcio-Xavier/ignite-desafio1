import { useState } from 'react'
import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    const id = Math.floor(Math.random() * 1000) + 1;
    const taskExistente = tasks.find(x => x.id == id) != undefined;

    if (!newTaskTitle || taskExistente) { return; }

    const novaTask: Task = {
      id: id,
      title: newTaskTitle,
      isComplete: false
    };

    setTasks(tasksExistentes => [...tasksExistentes, novaTask]);
  }

  function handleToggleTaskCompletion(id: number) {
    tasks.forEach(x => x.isComplete = x.id === id ? !x.isComplete : x.isComplete);
    setTasks(tasksExistentes => [...tasksExistentes]);
  }

  function handleRemoveTask(id: number) {
    tasks.forEach((task, indice) => {
      if (task.id == id) {
        tasks.splice(indice, 1);
      }
    });

    setTasks(tasksExistentes => [...tasksExistentes]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input type="text" placeholder="Adicionar novo todo" onChange={(e) => setNewTaskTitle(e.target.value.trim())} value={newTaskTitle} />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}><FiCheckSquare size={16} color="#fff" /></button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>(#{task.id})</p>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}