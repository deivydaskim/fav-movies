import { PropsWithChildren } from 'react';

const TabsContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="border-b border-gray-600 flex">{children}</div>;
};

export default TabsContainer;
