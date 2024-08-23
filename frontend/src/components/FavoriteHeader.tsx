import FavoriteModal from "./FavoriteModal";

const FavoriteHeader = () => {
  return (
    <div className="flex justify-between bg-white/10 rounded-md h-full p-2">
      <p>Header for sorting, adding new movies</p>
      <FavoriteModal title={'Add New'}/>
    </div>
  );
};

export default FavoriteHeader;
