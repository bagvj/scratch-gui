import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import costumeLibraryContent from '../lib/libraries/costumes.json';
import LibraryComponent from '../components/library/library.jsx';
import {defineMessages, intlShape, injectIntl} from 'react-intl';

const messages = defineMessages({
    costumeLibrary: {
        id: "gui.costumeLibrary.costumeLibrary",
        description: "Title for costume library in the costume-library",
        defaultMessage: "Costume Library"
    }
})

class CostumeLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelected'
        ]);
    }
    handleItemSelected (item) {
        const vmCostume = {
            name: item.name,
            rotationCenterX: item.info[0],
            rotationCenterY: item.info[1],
            bitmapResolution: item.info.length > 2 ? item.info[2] : 1,
            skinId: null
        };
        this.props.vm.addCostume(item.md5, vmCostume);
    }
    render () {
        return (
            <LibraryComponent
                data={costumeLibraryContent}
                // title="Costume Library"
                title={this.props.intl.formatMessage(messages.costumeLibrary)}
                onItemSelected={this.handleItemSelected}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

CostumeLibrary.propTypes = {
    onRequestClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired,
    intl: intlShape,
};

// export default CostumeLibrary;
export default injectIntl(CostumeLibrary);
