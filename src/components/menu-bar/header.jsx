import React from 'react';
import {connect} from 'react-redux';
import ProjectLoader from '../../lib/project-loader';
import style from './header.css';

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
                var defaultProject = JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA);
                kenrobot.view.newProject = _ => this.props.loadProject(defaultProject);
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
        return kenrobot && kenrobot.isPC ? (<span></span>) : (
            <div className={style.header}><span onClick={_ => this.onOpenClick()}>打开</span><span onClick={_ => this.onSaveClick()}>保存</span></div>
        );
    }
};

const mapStateToProps = state => ({
    getProject: state.vm.toJSON.bind(state.vm),
    loadProject: state.vm.fromJSON.bind(state.vm),
});

module.exports = connect(mapStateToProps, () => ({}))(Header);
