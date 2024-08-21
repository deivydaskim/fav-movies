import { useState } from 'react';
import MediaList from './MediaList';
import TabsContainer from './TabsContainer';
import TabButton from './TabButton';

const FeaturedTabs: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [seriesRendered, setSeriesRendered] = useState(false);

  const handleTabClick = (index: number) => {
    setTabIndex(index);
    if (index === 1 && seriesRendered === false) {
      setSeriesRendered(true);
    }
  };

  return (
    <>
      <TabsContainer>
        <TabButton
          label="Movies"
          isActive={tabIndex === 0}
          onClick={() => handleTabClick(0)}
        />
        <TabButton
          label="Series"
          isActive={tabIndex === 1}
          onClick={() => handleTabClick(1)}
        />
      </TabsContainer>
      <div className={tabIndex === 0 ? 'block' : 'hidden'}>
        <MediaList resource="movie/now_playing" />
      </div>
      {seriesRendered && (
        <div className={tabIndex === 1 ? 'block' : 'hidden'}>
          <MediaList resource="tv/airing_today" />
        </div>
      )}
    </>
  );
};

export default FeaturedTabs;
