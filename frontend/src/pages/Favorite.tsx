import FavoriteHeader from '../components/FavoriteHeader';
import FavoriteList from '../components/FavoriteList';

const Favorite = () => {
  return (
    <>
      <h1 className="headline-l text-center text-yellow-350 mt-10 mb-5">Favorite Movies</h1>
      <div className="lg:px-28 px-6">
        <FavoriteHeader />
      </div>
      <div className="lg:px-28 px-6">
        <FavoriteList />
      </div>
    </>
  );
};

export default Favorite;
