import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import stopAllIcon from './icon--stop-all.svg';
import styles from './stop-all.css';
import {defineMessages, intlShape, injectIntl} from 'react-intl';

const messages = defineMessages({
    stop: {
        id: "gui.stopAll.stop",
        description: "Button to stop all blocks in the stop-all",
        defaultMessage: "Stop"
    }
})

const StopAllComponent = function (props) {
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
                styles.stopAll,
                {
                    [styles.isActive]: active
                }
            )}
            draggable={false}
            src={stopAllIcon}
            // title={title}
            title={props.intl.formatMessage(messages.stop)}
            onClick={onClick}
            {...componentProps}
        />
    );
};

StopAllComponent.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    intl: intlShape,
    // title: PropTypes.string
};

StopAllComponent.defaultProps = {
    active: false,
    // title: 'Stop'
};

// export default StopAllComponent;
export default injectIntl(StopAllComponent);
