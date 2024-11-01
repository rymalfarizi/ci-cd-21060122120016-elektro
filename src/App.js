import React from 'react';
import TodoList from './components/TodoList';
import useTodos from './hooks/useTodos';
import useModal from './hooks/useModal';
import './App.css';

function App() {
  const {
    todos,
    newTodo,
    setNewTodo,
    addTodo,
    toggleComplete,
    editTodo,
    handleDelete,
    handleDeleteAll,
    confirmDeleteAll,
  } = useTodos();

  const {
    showModal,
    yesButtonRef,
    noButtonRef,
    deleteAll,
    setDeleteAll,
    setShowModal,
    confirmDelete,
    cancelDelete,
    handleKeyDown,
  } = useModal(handleDelete, confirmDeleteAll);

  return (
    <div className="App">
      <h1>To Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button className='buttonAdd' onClick={addTodo}>Add</button>
      {todos.length > 0 && <button className='buttonDel' onClick={() => handleDeleteAll(setDeleteAll, setShowModal)}>Delete All</button>}
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        deleteTodo={handleDelete}
      />
      {showModal && (
        <div className="modal" onKeyDown={handleKeyDown}>
          <div className="modal-content">
            <p>Are you sure you want to {deleteAll ? 'delete all tasks' : 'delete this task'}?</p>
            <button ref={yesButtonRef} onClick={confirmDelete}>Yes</button>
            <button ref={noButtonRef} onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;