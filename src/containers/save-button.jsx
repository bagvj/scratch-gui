const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const {connect} = require('react-redux');

const ButtonComponent = require('../components/button/button.jsx');

class SaveButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }
    handleClick () {
        const json = this.props.saveProjectSb3();

        // Download project data into a file - create link element,
        // simulate click on it, and then remove it.
        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);

        const data = new Blob([json], {type: 'text'});
        const url = window.URL.createObjectURL(data);
        saveLink.href = url;

        // File name: project-DATE-TIME
        const date = new Date();
        const timestamp = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
        saveLink.download = `project-${timestamp}.json`;
        saveLink.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(saveLink);
    }
    render () {
        const {
            saveProjectSb3, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <ButtonComponent
                onClick={this.handleClick}
                {...props}
            >
                保存
            </ButtonComponent>
        );
    }
}

SaveButton.propTypes = {
    saveProjectSb3: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    saveProjectSb3: state.vm.saveProjectSb3.bind(state.vm)
});

module.exports = connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SaveButton);
