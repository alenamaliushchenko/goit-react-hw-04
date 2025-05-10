import css from './ImageCard.module.css'

const ImageCard = ({ image, onClick }) => {
    return (
        <div>
            <img
                src={image.urls.small}
                alt={image.alt_description}
                onClick={onClick}
                className={css.image}
              
            />
        </div>
    );
};

export default ImageCard;