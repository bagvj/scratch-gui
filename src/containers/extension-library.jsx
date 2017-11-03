import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import extensionLibraryContent from '../lib/libraries/extensions.json';

import LibraryComponent from '../components/library/library.jsx';
import extensionIcon from '../components/sprite-selector/icon--sprite.svg';
import {defineMessages, intlShape, injectIntl} from 'react-intl';

const messages = defineMessages({
    extensionLibrary: {
        id: "gui.extensionLibrary.extensionLibrary",
        description: "Title for extension library in the extension-library",
        defaultMessage: "Extension Library"
    }
})

class ExtensionLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        // eslint-disable-next-line no-alert
        const url = item.extensionURL || prompt('Enter the URL of the extension');
        if (url) {
            if (this.props.vm.extensionManager.isExtensionLoaded(url)) {
                this.props.onCategorySelected(item.name);
            } else {
                this.props.vm.extensionManager.loadExtensionURL(url);
            }
        }
    }
    render () {
        const extensionLibraryThumbnailData = extensionLibraryContent.map(extension => ({
            rawURL: extension.iconURL || extensionIcon,
            ...extension
        }));
        return (
            <LibraryComponent
                data={extensionLibraryThumbnailData}
                // title="Extension Library"
                title={this.props.intl.formatMessage(messages.extensionLibrary)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

ExtensionLibrary.propTypes = {
    onCategorySelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired, // eslint-disable-line react/no-unused-prop-types
    intl: intlShape,
};

// export default ExtensionLibrary;
export default injectIntl(ExtensionLibrary);
