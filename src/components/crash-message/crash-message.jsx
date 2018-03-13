import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';

import styles from './crash-message.css';
import reloadIcon from './reload.svg';
import {defineMessages} from 'react-intl';

const messages = defineMessages({
    reload: {
        defaultMessage: 'Reload',
        description: 'reload',
        id: 'gui.crashMessage.reload'
    },
    title: {
        defaultMessage: 'Oops! Something went wrong.',
        description: 'crash message title',
        id: 'gui.crashMessage.title'
    },
    content: {
        defaultMessage: 'We are so sorry, but it looks like Scratch has crashed. This bug has been\nautomatically reported to the Scratch Team. Please refresh your page to try\nagain.',
        description: 'crash message body',
        id: 'gui.crashMessage.content'
    }
});

const CrashMessage = props => (
    <div className={styles.crashWrapper}>
        <Box className={styles.body}>
            <img
                className={styles.reloadIcon}
                src={reloadIcon}
            />
            <h2>{messages.title}</h2>
            <p>{messages.content}</p>
            <button
                className={styles.reloadButton}
                onClick={props.onReload}
            >
                {message.title}
            </button>
        </Box>
    </div>
);

CrashMessage.propTypes = {
    onReload: PropTypes.func.isRequired
};

export default CrashMessage;
