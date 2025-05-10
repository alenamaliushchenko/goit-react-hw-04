import toast from 'react-hot-toast';
import css from './SearchBar.module.css'


const SearchBar = ({ onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const query = e.target.search.value.trim();
        if(query === ""){
            toast.error('Введіть текст для пошуку зображень!');
            return;
        }
        onSubmit(query);
    };
    return(
        <header className={css.header}>
            <form onSubmit={handleSubmit} className={css.form}>
                <input
                    type="text"
                    name="search"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    className={css.input}
                />
                <button type="submit" className={css.button}>
                    Search
                </button>
            </form>
        </header>
    );    
};
    
export default SearchBar;