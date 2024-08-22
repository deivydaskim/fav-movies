import FavoriteList from '../components/FavoriteList';

const Favorite = () => {
  return (
    <>
      <div className=" lg:px-28 px-6 h-16 leading-[64px] mt-10 text-center">
        <p className="bg-white/10">Header for sorting, adding new movies</p>
      </div>
      <div className="lg:px-28 px-6">
        <FavoriteList />
      </div>
    </>
  );
};

export default Favorite;
