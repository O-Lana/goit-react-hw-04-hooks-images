import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onClickBtn }) => {
    return (
        <button type="button" className="button" onClick={onClickBtn}>
            Load more
        </button>
    );
};


Button.propType = {
    onClickBtn: PropTypes.func.isRequired,
};

export default Button;
