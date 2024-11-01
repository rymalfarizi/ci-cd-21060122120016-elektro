import { useState } from 'react';

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleDeleteAll = (setDeleteAll, setShowModal) => {
    setDeleteAll(true);
    setShowModal(true);
  };

  const confirmDeleteAll = () => {
    setTodos([]);
  };

  return {
    todos,
    newTodo,
    setNewTodo,
    addTodo,
    toggleComplete,
    editTodo,
    handleDelete,
    handleDeleteAll,
    confirmDeleteAll,
  };
}

export default useTodos;
