import { useNavigation } from 'react-router-dom';

import FeaturedTabs from '../components/FeaturedTabs';
import MediaList from '../components/MediaList';
import Spinner from '../components/Spinner';

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === 'loading' && (
        <div className="fixed inset-0 z-20 grid place-items-center bg-black/20">
          <Spinner />
        </div>
      )}
      <div className="px-6 lg:px-28">
        <section className="mt-14">
          <h1 className="text-yellow-350 headline-l">Featured Today</h1>
          <div>
            <FeaturedTabs />
          </div>
        </section>
        <section className="mt-14">
          <h1 className="text-yellow-350 headline-l">
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
