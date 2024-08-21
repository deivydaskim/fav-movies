import { useNavigation } from 'react-router-dom';

import FeaturedTabs from '../components/FeaturedTabs';
import MediaList from '../components/MediaList';
import Spinner from '../components/Spinner';

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === 'loading' && (
        <div className="fixed z-20 inset-0 grid place-items-center bg-slate-800/30">
          <Spinner />
        </div>
      )}
      <div className="lg:px-28 px-6">
        <section className="mt-14">
          <h1 className="headline-l text-yellow-350">Featured Today</h1>
          <div>
            <FeaturedTabs />
          </div>
        </section>
        <section className="mt-14">
          <h1 className="headline-l text-yellow-350">
            Premiers and announcments
          </h1>
          <div>
            <MediaList resource="movie/upcoming" />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
