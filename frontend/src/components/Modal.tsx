import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Add the event listener when the modal is open
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Close modal if clicked outside
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/50"
      onClick={handleOutsideClick}
    >
      <div className="relative max-h-[80vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-4 text-black shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-2 text-3xl text-gray-600"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
