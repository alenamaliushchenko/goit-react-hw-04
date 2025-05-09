import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './Gallery/ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import axios from 'axios';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageModal from './ImageModal/ImageModal';



import { Toaster, toast } from 'react-hot-toast';


function App() {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    
    const handleSearch = async (value) => {
        setQuery(value);
        setError(false);
    }; 
    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    useEffect(() => {
        if(!query){
            toast.error("Будь ласка, введіть запит для пошуку.");
            setLoading(false);
            return;
        };
   
    const fetchImages = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.get(
                `https://api.unsplash.com/search/photos?query=${query}&client_id=Hs4nb1GNNIInziJnhU5hRAMu7n64lRDDM0WKSOg7fN8`
            );
            setImages(response.data.results);
            if (response.data.results.length === 0) {
                toast.error('Зображення не знайдено. Спробуйте інший запит.');
            }    
        } catch (error) {
            setError(true);
            toast.error('Щось пішло не так!');
        } finally {
          setLoading(false);
        }
    };
  
      fetchImages();
    }, [query]);

    return(
        <>
            <SearchBar onSubmit={handleSearch}></SearchBar>
            <Toaster position="top-right" />
            {error && <ErrorMessage  message="Не вдалося завантажити зображення. Спробуйте ще раз!" />}
            <ImageGallery images={images} onImageClick={openModal}  />
            <Loader loading={loading} />
            {selectedImage && (
                <ImageModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    image={selectedImage}
                />
            )}
            
        </>
    )
};

export default App;
