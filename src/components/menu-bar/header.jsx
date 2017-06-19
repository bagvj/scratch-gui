const React = require('react');
const styles = require('./header.css');
const logo = require('./logo.svg');
const {connect} = require('react-redux');

class Header extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            type: "pc"
        };
    }

    componentWillMount() {
        var kenrobot = top.kenrobot;
        if(!kenrobot || !kenrobot.postMessage || !kenrobot.view) {
            this.setState({
                type: "web"
            });
            return;
        }

        kenrobot.view.getProject = this.props.getProject;
        kenrobot.view.loadProject = this.props.loadProject;
    }

    render() {
        return this.state.type != "pc" ? (
            <div className={styles.header}>
                <a className={styles.logo} href="http://www.kenrobot.com" target="_blank"><img src={logo} /></a>
                <ul className={styles.nav}>
                    <li><a href="http://www.kenrobot.com" target="_blank">首页</a></li>
                    <li><a href="http://edu.kenrobot.com" target="_blank">教育版</a></li>
                    <li><a href="http://ide.kenrobot.com" target="_blank">开发版</a></li>
                    <li><a href="http://scratch2.kenrobot.com" target="_blank">Scratch2</a></li>
                    <li><a href="http://scratch3.kenrobot.com" target="_blank">Scratch3(Beta版)</a></li>
                    <li><a href="http://www.kenrobot.com/index.php?app=square&mod=Index&act=help" target="_blank">帮助</a></li>
                </ul>
            </div>
        ) : (
            <div></div>
        );
    }
};

const mapStateToProps = state => ({
    getProject: state.vm.toJSON.bind(state.vm),
    loadProject: state.vm.fromJSON.bind(state.vm),
});

module.exports = connect(mapStateToProps, () => ({}))(Header);
