const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const defaultOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const fetchData = async <T>(
  url: string,
  options = defaultOptions
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.json();
      const error: FetchError = new Error(
        errorText.status_message || 'Unknown error occurred'
      );
      error.status = response.status;
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error('Error while fetching:', error);
    throw error;
  }
};

const getMedia = async (page = 1, resource: string) => {
  const url = `${BASE_URL}/${resource}?language=en-US&page=${page}`;
  return fetchData<MediaResult<Movie | TV>>(url);
};

const getSearchResults = async (query: string) => {
  const url = `${BASE_URL}/search/multi?query=${query}`;
  return fetchData(url);
};

export { getMedia, getSearchResults, fetchData };
