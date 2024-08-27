import { PropsWithChildren } from 'react';

const TabsContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex border-b border-gray-600">{children}</div>;
};

export default TabsContainer;
