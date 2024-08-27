interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`cursor-pointer px-4 py-2 text-base text-gray-400 transition-colors body-2 ${
        isActive ? 'border-b-2 border-white text-white' : 'hover:text-white'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
