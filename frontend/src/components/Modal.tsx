interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 relative">
        <button
          onClick={onClose}
          className="absolute text-3xl top-2 right-4 text-gray-600"
        >
         &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
