import ImageCard from '../ImageGallery/ImageCard/ImageCard'
import css from './ImageGallery.module.css'

const ImageGallery = ({ images, onImageClick }) => {
    if(!images || images.length === 0){
        return <p>Немає зображень для відображення.</p>;
    }
    return (
        <ul className={css.gallery}>
            {images.map((image) => (
                <li key={image.id} onClick={() => onImageClick(image)}>
                    <ImageCard image={image} />
                </li>
            ))}
        </ul>
    );
};

export default ImageGallery;