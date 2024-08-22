import { formatDate } from '../utils/utils';

interface FavoriteItemProps {
  details: FavoriteItem;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ details }) => {
  return (
    <li className="flex p-2 border-[1px] border-white/10 rounded-md">
      <div className="flex flex-1 gap-4">
        <img
          className="max-h-80 rounded-sm"
          src={details.imageUrl}
          alt={details.title}
        />
        <div className="flex flex-col justify-between py-1">
          <div className="space-y-2">
            <h1 className="headline-m">{details.title}</h1>
            <p className="body-2">{details.description}</p>
          </div>
          <p className="body-2">
            Release date: {formatDate(details.releaseDate)}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <button className='border-[1px] border-yellow-350 rounded-md'>X</button>
        <button className='text-yellow-350'>Edit</button>
      </div>
    </li>
  );
};

export default FavoriteItem;
