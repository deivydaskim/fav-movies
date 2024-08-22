import FavoriteItem from './FavoriteItem';

const FavoriteList: React.FC = () => {
  const mockData = [
    {
      id: 1,
      title: 'Movie title',
      description: 'Some text about movie',
      releaseDate: '2021-08-09T21:00:00.000Z',
      imageUrl:
        'https://image.tmdb.org/t/p/w300//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    },
    {
      id: 2,
      title: 'Movie title',
      description: 'Some text about movie',
      releaseDate: '2021-08-09T21:00:00.000Z',
      imageUrl:
        'https://image.tmdb.org/t/p/w300//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    },
    {
      id: 3,
      title: 'Movie title',
      description: 'Some text about movie',
      releaseDate: '2021-08-09T21:00:00.000Z',
      imageUrl:
        'https://image.tmdb.org/t/p/w300//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    },
    {
      id: 4,
      title: 'Movie title',
      description: 'Some text about movie',
      releaseDate: '2021-08-09T21:00:00.000Z',
      imageUrl:
        'https://image.tmdb.org/t/p/w300//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    },
    {
      id: 5,
      title: '1',
      description: 'Some text about movie',
      releaseDate: '2021-08-09T21:00:00.000Z',
      imageUrl:
        'https://image.tmdb.org/t/p/w300//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    },
    {
      id: 6,
      title: '2',
      description: 'Some text about movie',
      releaseDate: '2021-08-09T21:00:00.000Z',
      imageUrl:
        'https://image.tmdb.org/t/p/w300//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    },
    {
      id: 7,
      title: '3',
      description: 'Some text about movie',
      releaseDate: '2021-08-09T21:00:00.000Z',
      imageUrl:
        'https://image.tmdb.org/t/p/w300//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    },
    {
      id: 8,
      title: '4',
      description: 'Some text about movie',
      releaseDate: '2021-08-09T21:00:00.000Z',
      imageUrl:
        'https://image.tmdb.org/t/p/w300//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    },
    {
      id: 9,
      title: '5',
      description: 'Some text about movie',
      releaseDate: '2021-08-09T21:00:00.000Z',
      imageUrl:
        'https://image.tmdb.org/t/p/w300//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    },
    {
      id: 10,
      title: '6',
      description: 'Some text about movie',
      releaseDate: '2021-08-09T21:00:00.000Z',
      imageUrl:
        'https://image.tmdb.org/t/p/w300//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    },
  ];

  return (
    <ul className="my-2 space-y-2">
      {mockData.map((item) => (
        <FavoriteItem key={item.id} details={item} />
      ))}
    </ul>
  );
};

export default FavoriteList;
