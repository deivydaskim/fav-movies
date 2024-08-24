import React, { useState } from 'react';
import Modal from './Modal';
import FavoriteForm from './FavoriteForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addMovie, updateMovie } from '../store/favoriteSlice';

interface FavoriteModalProps {
  title: string;
  data?: FavMovie;
  mode?: 'add' | 'edit';
}

const initialData = {
  id: 0,
  title: '',
  description: '',
  releaseDate: '',
  imageUrl: '',
};

const FavoriteModal: React.FC<FavoriteModalProps> = ({
  title,
  data = initialData,
  mode = 'add',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FavMovie>(data);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'add') {
        await dispatch(addMovie(formData)).unwrap();
      }
      if (mode === 'edit') {
        await dispatch(updateMovie({ movieId: formData.id, movie: formData }));
      }
    } catch (error) {
      console.error(`Failed to ${mode} movie:`, error);
    } finally {
      handleCloseModal();
    }
  };

  const buttonStyle =
    mode === 'add'
      ? 'bg-yellow-350 text-black py-2 px-4 rounded-md'
      : 'text-yellow-350 px-1 rounded-md';

  return (
    <>
      <button className={buttonStyle} onClick={handleOpenModal}>
        {title}
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FavoriteForm
          formData={formData}
          onCancel={handleCloseModal}
          onSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
          mode={mode}
        />
      </Modal>
    </>
  );
};

export default FavoriteModal;
