import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './Gallery/ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import axios from 'axios';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageModal from './ImageModal/ImageModal';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import { Toaster, toast } from 'react-hot-toast';

function App() {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);

    // Функція для пошуку зображень
    const handleSearch = async (value) => {
        setQuery(value);
        setImages([]); // очищуємо попередні зображення
        setPage(1); // починаємо з першої сторінки
        setError(false); // скидаємо помилку
    };

    // Функція для завантаження наступної сторінки
    const handleLoadMore = () => {
        setPage((prev) => prev + 1); // збільшуємо номер сторінки
    };

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    // Використовуємо useEffect для завантаження зображень
    useEffect(() => {
        if (!query) return; // Якщо запиту немає, не виконувати запит

        const fetchImages = async () => {
            setLoading(true);
            setError(false); // скидаємо помилку
            try {
                const response = await axios.get(
                    `https://api.unsplash.com/search/photos?query=${query}&client_id=Hs4nb1GNNIInziJnhU5hRAMu7n64lRDDM0WKSOg7fN8`,
                    {
                        params: {
                            query: query,
                            client_id: 'Hs4nb1GNNIInziJnhU5hRAMu7n64lRDDM0WKSOg7fN8',
                            per_page: 12,
                            page: page,
                        },
                    }
                );
                const newImages = response.data.results;

                if (newImages.length === 0 && page === 1) {
                    toast.error('Зображення не знайдено. Спробуйте інший запит.');
                }

                setImages((prev) => [...prev, ...newImages]);
            } catch (error) {
                setError(true); // У разі помилки, встановлюємо стан error
                toast.error('Щось пішло не так!');
            } finally {
                setLoading(false);
            }
        };

        fetchImages(); // Викликаємо функцію завантаження зображень
    }, [query, page]); // Залежності: перезапуск після зміни запиту або сторінки

    return (
        <>
            <SearchBar onSubmit={handleSearch} query={query}></SearchBar>
            <Toaster position="top-right" />
            {error && <ErrorMessage message="Не вдалося завантажити зображення. Спробуйте ще раз!" />}
            <ImageGallery images={images} onImageClick={openModal} />
            {loading && <Loader loading={loading} />}
            {images.length > 0 && !loading && (
                <LoadMoreBtn onClick={handleLoadMore} />
            )}
            {selectedImage && (
                <ImageModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    image={selectedImage}
                />
            )}
        </>
    );
}

export default App;
