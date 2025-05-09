import ImageCard from '../ImageGallery/ImageCard/ImageCard'
import css from './ImageGallery.module.css'

const ImageGallery = ({images}) => {
    if(!images || images.length === 0){
        return <p>Немає зображень для відображення.</p>;
    }
    return (
        <ul className={css.gallery}>
            {images.map((image) => (
                <li key={image.id}>
                    <ImageCard image={image} />
                </li>
            ))}
        </ul>
    );
};

export default ImageGallery;