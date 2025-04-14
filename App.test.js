import { createContext, useReducer, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { ...action.payload, id: Date.now().toString() }];
    case 'UPDATE_TASK':
      return state.map(task => 
        task.id === action.payload.id ? action.payload : task
      );
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map(task => 
        task.id === action.payload ? {...task, completed: !task.completed} : task
      );
    case 'SET_TASKS':
      return action.payload;
    case 'FILTER_TASKS':
      return {
        ...state,
        filteredTasks: filterTasks(state.tasks, action.payload)
      };
    default:
      return state;
  }
};

const filterTasks = (tasks, filter) => {
  switch (filter.status) {
    case 'completed':
      return tasks.filter(task => task.completed);
    case 'pending':
      return tasks.filter(task => !task.completed);
    default:
      return tasks;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    filteredTasks: [],
    filter: { status: 'all', search: '' }
  });

  // Cargar tareas desde localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('angel-tasks')) || [];
    dispatch({ type: 'SET_TASKS', payload: savedTasks });
  }, []);

  // Guardar tareas en localStorage
  useEffect(() => {
    localStorage.setItem('angel-tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Filtrar tareas cuando cambian los filtros
  useEffect(() => {
    dispatch({ type: 'FILTER_TASKS', payload: state.filter });
  }, [state.tasks, state.filter]);

  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};