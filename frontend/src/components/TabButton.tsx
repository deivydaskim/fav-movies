interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`body-2 text-gray-400 py-2 px-4 text-base cursor-pointer transition-colors ${
        isActive ? 'border-b-2 text-white border-white' : 'hover:text-white'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
