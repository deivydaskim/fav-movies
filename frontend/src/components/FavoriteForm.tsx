import React from 'react';
import FavoriteFormField from './FavoriteFormField';

interface FavoriteFormProps {
  formData: FavMovie;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  mode: 'edit' | 'add';
}

const FavoriteForm: React.FC<FavoriteFormProps> = ({
  formData,
  onInputChange,
  onCancel,
  onSubmit,
  mode,
}) => {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <FavoriteFormField
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          placeholder="Enter movie title"
        />
        <FavoriteFormField
          label="Description"
          type="textarea"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          placeholder="Enter movie description"
        />
        <FavoriteFormField
          label="Release Date"
          type="date"
          name="releaseDate"
          value={formData.releaseDate.split('T')[0]}
          onChange={onInputChange}
        />
        <FavoriteFormField
          label="Image URL"
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={onInputChange}
          placeholder="Enter image URL"
        />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          className="rounded-md border-[1px] border-yellow-350 px-4 py-1 text-black"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-1 text-yellow-350"
        >
          {mode === 'edit' ? 'Save' : 'Add'} Movie
        </button>
      </div>
    </form>
  );
};

export default FavoriteForm;
