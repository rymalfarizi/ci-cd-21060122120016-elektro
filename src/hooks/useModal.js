import { useState, useRef, useEffect } from 'react';

function useModal(handleDelete, confirmDeleteAll) {
  const [showModal, setShowModal] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      yesButtonRef.current.focus();
    }
  }, [showModal]);

  const confirmDelete = () => {
    if (deleteAll) {
      confirmDeleteAll();
    } else {
      handleDelete();
    }
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

  return {
    showModal,
    yesButtonRef,
    noButtonRef,
    deleteAll,
    setDeleteAll,
    setShowModal,
    confirmDelete,
    cancelDelete,
    handleKeyDown,
  };
}

export default useModal;
