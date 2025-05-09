import css from './ErrorMessage.module.css'
const ErrorMessage = ({ message }) => {
    return(
        <div className={css.errorMessage}>
            <p>{message || 'Сталась помилка при завантаженні зображень!'}</p>
        </div>
    );
};

export default ErrorMessage;