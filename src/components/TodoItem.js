import React, { useState, useRef, useEffect } from 'react';
import { FaCheck, FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import './TodoItem.css';

function TodoItem({ todo, index, toggleComplete, editTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(index, newText);
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteTodo(index);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      if (document.activeElement === yesButtonRef.current) {
        event.preventDefault();
        noButtonRef.current.focus();
      } else if (document.activeElement === noButtonRef.current) {
        event.preventDefault();
        yesButtonRef.current.focus();
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (showModal) {
      yesButtonRef.current.focus();
    }
  }, [showModal]);

  return (
    <>
      <li>
        <input
          className="todo-checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(index)}
        />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        ) : (
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
        )}
        {!isEditing && <FaCheck className="complete-icon" onClick={() => toggleComplete(index)} />}
        {isEditing ? (
          <div style={{ flexGrow: 1, textAlign: 'center' }}>
            <FaSave onClick={handleSave} />
          </div>
        ) : (
          <FaEdit onClick={handleEdit} />
        )}
        {!isEditing && <FaTrash className="delete-icon" onClick={handleDelete} />}
      </li>
      {showModal && (
        <div className="modal" onKeyDown={handleKeyDown}>
          <div className="modal-content">
            <p>Are you sure you want to delete this task?</p>
            <button ref={yesButtonRef} onClick={confirmDelete}>Yes</button>
            <button ref={noButtonRef} onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoItem;