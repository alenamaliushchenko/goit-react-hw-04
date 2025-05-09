import { ClipLoader } from "react-spinners";
import css from './Loader.module.css'


const Loader = ({loading}) => {
    return (
        <div className={css.loader}>
            <ClipLoader
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
      
    );
};

export default Loader;
