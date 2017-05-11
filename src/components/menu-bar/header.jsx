const React = require('react');
const styles = require('./header.css');
const logo = require('./logo.svg');

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            displayHeader: false,
        };
    }

    componentWillMount() {
        if(!window.kenrobot || !kenrobot.postMessage) {
            this.setState({
                displayHeader: true
            });
        }
    }

    render() {
        return this.state.displayHeader ? (
            <div className={styles.header}>
                <a className={styles.logo} href="http://www.kenrobot.com" target="_blank"><img src={logo} /></a>
                <ul className={styles.nav}>
                    <li><a href="http://www.kenrobot.com" target="_blank">首页</a></li>
                    <li><a href="http://edu.kenrobot.com#f=master" target="_blank">教育版</a></li>
                    <li><a href="http://ide.kenrobot.com#f=master" target="_blank">开发版</a></li>
                    <li><a href="http://www.kenrobot.com/index.php?app=square&mod=Index&act=help" target="_blank">帮助</a></li>
                </ul>
            </div>
        ) : (
            <div></div>
        );
    }
}

module.exports = Header;
