import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import MediaQuery from 'react-responsive';

import Box from '../box/box.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';

import layout from '../../lib/layout-constants.js';
import styles from './sprite-info.css';

import xIcon from './icon--x.svg';
import yIcon from './icon--y.svg';
import showIcon from './icon--show.svg';
import hideIcon from './icon--hide.svg';

import {FormattedMessage, defineMessages, intlShape, injectIntl} from 'react-intl';

const messages = defineMessages({
    name: {
        id: "gui.spriteInfo.name",
        description: "Placeholder for sprite name in the sprite-info",
        defaultMessage: "Name"
    },
    sprite: {
        id: "gui.spriteInfo.sprite",
        description: "Label for sprite in the sprite-info",
        defaultMessage: "Sprite"
    },
    show: {
        id: "gui.spriteInfo.show",
        description: "Label for show in the sprite-info",
        defaultMessage: "Show"
    },
    direction: {
        id: "gui.spriteInfo.direction",
        description: "Label for direction in the sprite-info",
        defaultMessage: "Direction"
    },
    rotation: {
        id: "gui.spriteInfo.rotation",
        description: "Label for rotation in the sprite-info",
        defaultMessage: "Rotation"
    },
    leftRight: {
        id: "gui.spriteInfo.leftRight",
        description: "Label for rotation left-right in the sprite-info",
        defaultMessage: "left-right"
    },
    doNotRotate: {
        id: "gui.spriteInfo.doNotRotate",
        description: "Label for rotation don't-rotate in the sprite-info",
        defaultMessage: "don't rotate"
    },
    allAround: {
        id: "gui.spriteInfo.allAround",
        description: "Label for rotation all-around in the sprite-info",
        defaultMessage: "all around"
    },
})

const BufferedInput = BufferedInputHOC(Input);
const ROTATION_STYLES = ['left-right', 'don\'t rotate', 'all around'];

class SpriteInfo extends React.Component {
    shouldComponentUpdate (nextProps) {
        return (
            this.props.direction !== nextProps.direction ||
            this.props.disabled !== nextProps.disabled ||
            this.props.name !== nextProps.name ||
            this.props.rotationStyle !== nextProps.rotationStyle ||
            this.props.visible !== nextProps.visible ||
            this.props.x !== nextProps.x ||
            this.props.y !== nextProps.y
        );
    }
    render () {
        return (
            <Box
                className={styles.spriteInfo}
            >
                <div className={classNames(styles.row, styles.rowPrimary)}>
                    <div className={classNames(styles.group, styles.spriteName)}>
                        <Label text={this.props.intl.formatMessage(messages.sprite)}>
                            <BufferedInput
                                disabled={this.props.disabled}
                                placeholder={this.props.intl.formatMessage(messages.name)}
                                tabIndex="1"
                                type="text"
                                value={this.props.disabled ? '' : this.props.name}
                                onSubmit={this.props.onChangeName}
                            />
                        </Label>
                    </div>

                    <div className={styles.group}>
                        <MediaQuery minWidth={layout.fullSizeMinWidth}>
                            <div className={styles.iconWrapper}>
                                <img
                                    aria-hidden="true"
                                    className={classNames(styles.xIcon, styles.icon)}
                                    src={xIcon}
                                />
                            </div>
                        </MediaQuery>
                        <Label text="x">
                            <BufferedInput
                                small
                                disabled={this.props.disabled}
                                placeholder="x"
                                tabIndex="2"
                                type="text"
                                value={this.props.disabled ? '' : this.props.x}
                                onSubmit={this.props.onChangeX}
                            />
                        </Label>
                    </div>

                    <div className={styles.group}>
                        <MediaQuery minWidth={layout.fullSizeMinWidth}>
                            <div className={styles.iconWrapper}>
                                <img
                                    aria-hidden="true"
                                    className={classNames(styles.yIcon, styles.icon)}
                                    src={yIcon}
                                />
                            </div>
                        </MediaQuery>
                        <Label text="y">
                            <BufferedInput
                                small
                                disabled={this.props.disabled}
                                placeholder="y"
                                tabIndex="3"
                                type="text"
                                value={this.props.disabled ? '' : this.props.y}
                                onSubmit={this.props.onChangeY}
                            />
                        </Label>
                    </div>
                </div>

                <div className={classNames(styles.row, styles.rowSecondary)}>
                    <div className={styles.group}>
                        <MediaQuery minWidth={layout.fullSizeMinWidth}>
                            <Label
                                secondary
                                text={this.props.intl.formatMessage(messages.show)}
                            />
                        </MediaQuery>
                        <div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioLeft,
                                    styles.iconWrapper,
                                    {
                                        [styles.isActive]: this.props.visible && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="4"
                                onClick={this.props.onClickVisible}
                                onKeyPress={this.props.onPressVisible}
                            >
                                <img
                                    className={styles.icon}
                                    src={showIcon}
                                />
                            </div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioRight,
                                    styles.iconWrapper,
                                    {
                                        [styles.isActive]: !this.props.visible && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="5"
                                onClick={this.props.onClickNotVisible}
                                onKeyPress={this.props.onPressNotVisible}
                            >
                                <img
                                    className={styles.icon}
                                    src={hideIcon}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.group}>
                        <Label
                            secondary
                            text={this.props.intl.formatMessage(messages.direction)}
                        >
                            <BufferedInput
                                small
                                disabled={this.props.disabled}
                                label={this.props.intl.formatMessage(messages.direction)}
                                tabIndex="6"
                                type="text"
                                value={this.props.disabled ? '' : this.props.direction}
                                onSubmit={this.props.onChangeDirection}
                            />
                        </Label>
                    </div>
                    <div className={styles.group}>
                        <Label
                            secondary
                            text={this.props.intl.formatMessage(messages.rotation)}
                        >
                            <select
                                className={classNames(styles.selectForm, styles.rotationSelect)}
                                disabled={this.props.disabled}
                                value={this.props.rotationStyle}
                                onChange={this.props.onChangeRotationStyle}
                            >
                                <option key="left-right" value="left-right">{this.props.intl.formatMessage(messages.leftRight)}</option>
                                <option key="don\'t rotate" value="don't rotate">{this.props.intl.formatMessage(messages.doNotRotate)}</option>
                                <option key="all around" value="all around">{this.props.intl.formatMessage(messages.allAround)}</option>
                            </select>
                        </Label>
                    </div>
                </div>
            </Box>
        );
    }
}

SpriteInfo.propTypes = {
    direction: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChangeDirection: PropTypes.func,
    onChangeName: PropTypes.func,
    onChangeRotationStyle: PropTypes.func,
    onChangeX: PropTypes.func,
    onChangeY: PropTypes.func,
    onClickNotVisible: PropTypes.func,
    onClickVisible: PropTypes.func,
    onPressNotVisible: PropTypes.func,
    onPressVisible: PropTypes.func,
    rotationStyle: PropTypes.oneOf(ROTATION_STYLES),
    visible: PropTypes.bool,
    x: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    y: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    intl: intlShape,
};

// export default SpriteInfo;
export default injectIntl(SpriteInfo);
