import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import defaultProjectData from '../../lib/default-project/project.json';
import {updateIntl} from '../../reducers/intl.js';
import languages from 'scratch-l10n';

import styles from './header.css';

var whenReady = (function() {
    var funcs = [];
    var ready = false;

    function handler(e) {
        if(ready) return;

        if(e.type === 'onreadystatechange' && document.readyState !== 'complete') {
            return;
        }

        for(var i=0; i<funcs.length; i++) {
            funcs[i].call(document);
        }
        ready = true;
        funcs = null;
    }
    if(document.addEventListener) {
        document.addEventListener('DOMContentLoaded', handler, false);
        document.addEventListener('readystatechange', handler, false);
        window.addEventListener('load', handler, false);
    }else if(document.attachEvent) {
        document.attachEvent('onreadystatechange', handler);
        window.attachEvent('onload', handler);
    }

    return function whenReady(fn) {
        if(ready) { fn.call(document); }
        else { funcs.push(fn); }
    }
})();

class Header extends React.Component {
    componentWillMount() {
        whenReady(_ => {
            var kenrobot = top.kenrobot;
            if(kenrobot && kenrobot.view) {
                kenrobot.view.getProject = this.props.getProject;
                kenrobot.view.loadProject = this.props.loadProject;
                var defaultProject = JSON.stringify(defaultProjectData);
                kenrobot.view.newProject = _ => this.props.loadProject(defaultProject);

                setTimeout(() => kenrobot.trigger("app", "ready"), 400);
            }
        });
    }

    onOpenClick() {
        var kenrobot = top.kenrobot;
        kenrobot.trigger("app", "command", "open-project");
    }

    onSaveClick() {
        var kenrobot = top.kenrobot;
        kenrobot.trigger("app", "command", "save-project");
    }

    render() {
        var kenrobot = top.kenrobot;
        const {onChange, currentLocale} = this.props;
        return kenrobot && kenrobot.isPC ? (<span></span>) : (
            <div className={styles.header}>
                <span onClick={_ => this.onOpenClick()}>
                    <FormattedMessage
                        defaultMessage="Open"
                        description="Label for the open button in the header"
                        id="gui.header.open"
                    />
                </span>
                <span onClick={_ => this.onSaveClick()}>
                    <FormattedMessage
                        defaultMessage="Save"
                        description="Label for the save button in the header"
                        id="gui.header.save"
                    />
                </span>
                <select
                    className={styles.languageSelect}
                    value={currentLocale}
                    onChange={onChange}
                >
                    {Object.keys(languages).map(locale => (
                        <option
                            key={locale}
                            value={locale}
                        >
                            {languages[locale].name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    getProject: state.vm.toJSON.bind(state.vm),
    loadProject: state.vm.fromJSON.bind(state.vm),
    currentLocale: state.intl.locale,
});

const mapDispatchToProps = dispatch => ({
    onChange: e => {
        e.preventDefault();
        dispatch(updateIntl(e.target.value));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
