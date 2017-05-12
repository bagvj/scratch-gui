const React = require('react');
const styles = require('./header.css');
const logo = require('./logo.svg');

const Header = function Header () {
    var displayHeader = !window.kenrobot || !kenrobot.postMessage
    return displayHeader ? (
        <div className={styles.header}>
            <a className={styles.logo} href="http://www.kenrobot.com" target="_blank"><img src={logo} /></a>
            <ul className={styles.nav}>
                <li><a href="http://www.kenrobot.com" target="_blank">首页</a></li>
                <li><a href="http://edu.kenrobot.com#f=master" target="_blank">教育版</a></li>
                <li><a href="http://ide.kenrobot.com#f=master" target="_blank">开发版</a></li>
                <li><a href="http://scratch.kenrobot.com#f=master" target="_blank">Scratch3(Beta版)</a></li>
                <li><a href="http://www.kenrobot.com/index.php?app=square&mod=Index&act=help" target="_blank">帮助</a></li>
            </ul>
        </div>
    ) : (
        <div></div>
    );
};

module.exports = Header;
