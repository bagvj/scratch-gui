import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './green-flag.css';

import greenFlagIcon from './icon--green-flag.svg';
import {defineMessages, intlShape, injectIntl} from 'react-intl';

const messages = defineMessages({
    go: {
        id: "gui.greenFlag.go",
        description: "Button to run blocks in the green-flag",
        defaultMessage: "Go"
    }
})

const GreenFlagComponent = function (props) {
    const {
        active,
        className,
        onClick,
        // title,
        ...componentProps
    } = props;
    return (
        <img
            className={classNames(
                className,
                styles.greenFlag,
                {
                    [styles.isActive]: active
                }
            )}
            draggable={false}
            src={greenFlagIcon}
            // title={title}
            title={props.intl.formatMessage(messages.go)}
            onClick={onClick}
            {...componentProps}
        />
    );
};
GreenFlagComponent.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    intl: intlShape,
    // title: PropTypes.string
};
GreenFlagComponent.defaultProps = {
    active: false,
    // title: 'Go'
};
// export default GreenFlagComponent;
export default injectIntl(GreenFlagComponent);
