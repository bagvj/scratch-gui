const classNames = require('classnames');
const React = require('react');
const bindAll = require('lodash.bindall');

const Box = require('../box/box.jsx');
const styles = require('./menu-bar.css');
const logo = require('./logo.svg');

class MenuBar extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            "onWindowBtnClick",
            "onMenuClick",
            "activeMenu",
            "inactiveMenu",
        ]);

        this.state = {
            appMenuActive: false,
        };
    }

    onWindowBtnClick(action) {
        window.kenrobot && kenrobot.postMessage && kenrobot.postMessage(`app:${action}`);
    }

    onMenuClick(action) {
        if(!window.kenrobot || !kenrobot.postMessage) {
            this.inactiveMenu();
            return;
        }

        switch (action) {
            case "new-project":
            case "open-project":
            case "save-project":
            case "save-as-project":
            case "toggle-comment":
            case "copy":
            case "open-example":
            case "board-manage":
            case "library-manage":
            case "fullscreen":
                kenrobot.postMessage("app:fullscreen");
                break;
            case "language":
            case "theme":
            case "setting":
            case "switch-ui":
                kenrobot.postMessage("app:switchUI", "kenrobot");
                break;
            case "download-arduino-driver":
            case "check-update":
            case "visit-kenrobot":
                kenrobot.postMessage("app:openUrl", config.url.kenrobot);
                break;
            case "visit-arduino":
                kenrobot.postMessage("app:openUrl", config.url.arduino);
                break;
            case "suggestion":
                kenrobot.postMessage("app:openUrl", config.url.support);
                break;
            case "about-kenrobot":
                kenrobot.postMessage("app:openUrl", config.url.about);
                break;
        }

        this.inactiveMenu();
    }

    activeMenu() {
        this.setState({...this.state, appMenuActive: true});
    }

    inactiveMenu() {
        this.setState({...this.state, appMenuActive: false});
    }

    render() {
        return (
            <Box className={styles.menuBar}>
                <div className={classNames(styles.logoWrapper, styles.menuItem)}>
                    <img className={styles.logo} src={logo} />
                </div>
                <div className={classNames({
                        [styles.appMenu]: true,
                        [styles.menuItem]: true,
                        [styles.appMenuActive]: this.state.appMenuActive,
                    })} onMouseLeave={this.inactiveMenu}>
                    <ul>
                        <li>
                            <div className={styles.placeholder} onClick={this.activeMenu}>文件</div>
                            <ul>
                                <li onClick={_ => this.onMenuClick("new-project")}>
                                    <span className={styles.text}>新建项目</span><span className={styles.shortcut}>Ctrl+N</span>
                                </li>
                                <li className={styles.seperator}></li>
                                <li onClick={_ => this.onMenuClick("open-project")}>
                                    <span className={styles.text}>打开项目</span><span className={styles.shortcut}>Ctrl+O</span>
                                </li>
                                <li onClick={_ => this.onMenuClick("save-project")}>
                                    <span className={styles.text}>保存项目</span><span className={styles.shortcut}>Ctrl+S</span>
                                </li>
                                <li onClick={_ => this.onMenuClick("save-as-project")}>
                                    <span className={styles.text}>另存为</span><span className={styles.shortcut}>Ctrl+Shift+S</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className={styles.placeholder} onClick={this.activeMenu}>编辑</div>
                            <ul>
                                <li onClick={_ => this.onMenuClick("toggle-comment")}>
                                    <span className={styles.text}>注释/取消注释</span><span className={styles.shortcut}>Ctrl+/</span>
                                </li>
                                <li className={styles.seperator}></li>
                                <li onClick={_ => this.onMenuClick("copy")}>
                                    <span className={styles.text}>复制</span><span className={styles.shortcut}>Ctrl+C</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className={styles.placeholder} onClick={this.activeMenu}>案例</div>
                            <ul>
                                <li className="example-built-in">
                                    <div className={classNames(styles.placeholder, styles.arrow)}>内置示例</div>
                                    <ul></ul>
                                </li>
                                <li className={styles.seperator}></li>
                                <li className="example-third-party">
                                    <div className={classNames(styles.placeholder, styles.arrow)}>第三方示例</div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className={styles.placeholder} onClick={this.activeMenu}>选项</div>
                            <ul>
                                <li onClick={_ => this.onMenuClick("fullscreen")}>
                                    <span className={styles.text}>全屏</span>
                                </li>
                                <li onClick={_ => this.onMenuClick("language")}>
                                    <span className={styles.text}>语言</span>
                                </li>
                                <li onClick={_ => this.onMenuClick("theme")}>
                                    <span className={styles.text}>主题</span>
                                </li>
                                <li className={styles.seperator}></li>
                                <li onClick={_ => this.onMenuClick("setting")}>
                                    <span className={styles.text}>设置</span>
                                </li>
                                <li className={styles.seperator}></li>
                                <li onClick={_ => this.onMenuClick("switch-ui")}>
                                    <span className={styles.text}>切换Kenrobot</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className={styles.placeholder} onClick={this.activeMenu}>帮助</div>
                            <ul>
                                <li onClick={_ => this.onMenuClick("download-arduino-driver")}>
                                    <span className={styles.text}>Arduino驱动下载</span>
                                </li>
                                <li className={styles.seperator}></li>
                                <li onClick={_ => this.onMenuClick("check-update")}>
                                    <span className={styles.text}>检查更新</span>
                                </li>
                                <li onClick={_ => this.onMenuClick("visit-kenrobot")}>
                                    <span className={styles.text}>啃萝卜官网</span>
                                </li>
                                <li onClick={_ => this.onMenuClick("visit-arduino")}>
                                    <span className={styles.text}>Arduino论坛</span>
                                </li>
                                <li className={styles.seperator}></li>
                                <li onClick={_ => this.onMenuClick("suggestion")}>
                                    <span className={styles.text}>建议反馈</span>
                                </li>
                                <li onClick={_ => this.onMenuClick("about-kenrobot")}>
                                    <span className={styles.text}>关于啃萝卜</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className={styles.flexPlaceholder}></div>
                <div className={styles.windowBtns}>
                    <div className={classNames(styles.windowBtn, styles.minBtn)} data-action="min" onClick={_ => this.onWindowBtnClick("min")}></div>
                    <div className={classNames(styles.windowBtn, styles.maxBtn)} data-action="max" onClick={_ => this.onWindowBtnClick("max")}></div>
                    <div className={classNames(styles.windowBtn, styles.closeBtn)} data-action="quit" onClick={_ => this.onWindowBtnClick("quit")}></div>
                </div>
            </Box>
        );
    }
};

module.exports = MenuBar;
