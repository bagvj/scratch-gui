import PropTypes from 'prop-types';
import React from 'react';

import ButtonComponent from '../button/button.jsx';
import {FormattedMessage} from 'react-intl';

import styles from './load-button.css';

const LoadButtonComponent = ({
    inputRef,
    onChange,
    onClick,
    // title,
    ...props
}) => (
    <span {...props}>
        <ButtonComponent onClick={onClick}>
            <FormattedMessage
                defaultMessage="Load"
                description="Button for the load project in the load-button"
                id="gui.loadButton.load"
            />
        </ButtonComponent>
        <input
            className={styles.fileInput}
            ref={inputRef}
            type="file"
            onChange={onChange}
        />
    </span>
);

LoadButtonComponent.propTypes = {
    className: PropTypes.string,
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    // title: PropTypes.string
};
// LoadButtonComponent.defaultProps = {
//     title: 'Load'
// };
export default LoadButtonComponent;
