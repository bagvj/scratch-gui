const PropTypes = require('prop-types');
const React = require('react');
const VM = require('scratch-vm');
const Blocks = require('../../containers/blocks.jsx');
const CostumeTab = require('../../containers/costume-tab.jsx');
const GreenFlag = require('../../containers/green-flag.jsx');
const TargetPane = require('../../containers/target-pane.jsx');
const SoundTab = require('../../containers/sound-tab.jsx');
const Stage = require('../../containers/stage.jsx');
const StopAll = require('../../containers/stop-all.jsx');
const Header = require('../menu-bar/Header.jsx');
const {Tab, Tabs, TabList, TabPanel} = require('react-tabs');
const LoadButton = require('../../containers/load-button.jsx');
const SaveButton = require('../../containers/save-button.jsx');

const Box = require('../box/box.jsx');
const styles = require('./gui.css');

const GUIComponent = props => {
    const {
        basePath,
        children,
        vm,
        onTabSelect,
        tabIndex,
        ...componentProps
    } = props;
    if (children) {
        return (
            <Box {...componentProps}>
                {children}
            </Box>
        );
    }

    return (
        <Box
            className={styles.pageWrapper}
            {...componentProps}
        >
            <Header />
            <Box className={styles.bodyWrapper}>
                <Box className={styles.flexWrapper}>
                    <Box className={styles.editorWrapper}>
                        <Tabs
                            className={styles.tabs}
                            forceRenderTabPanel={true} // eslint-disable-line react/jsx-boolean-value
                            onSelect={onTabSelect}
                        >
                            <TabList className={styles.tabList}>
                                <Tab className={styles.tab}>脚本</Tab>
                                <Tab className={styles.tab}>造型</Tab>
                                <Tab className={styles.tab}>声音</Tab>
                            </TabList>
                            <TabPanel className={styles.tabPanel}>
                                <Box className={styles.blocksWrapper}>
                                    <Blocks
                                        grow={1}
                                        isVisible={tabIndex === 0} // Scripts tab
                                        options={{
                                            // media: `${basePath}static/blocks-media/`
                                            media: `static/blocks-media/`
                                        }}
                                        vm={vm}
                                    />
                                </Box>
                            </TabPanel>
                            <TabPanel className={styles.tabPanel}>
                                <CostumeTab vm={vm} />
                            </TabPanel>
                            <TabPanel className={styles.tabPanel}>
                                <SoundTab vm={vm} />
                            </TabPanel>
                        </Tabs>
                    </Box>

                    <Box className={styles.stageAndTargetWrapper} >
                        <Box className={styles.stageMenuWrapper} >
                            <GreenFlag vm={vm} />
                            <StopAll vm={vm} />
                            <span className={styles.placeholder}></span>
                            <LoadButton className={styles.button} />
                            <SaveButton className={styles.button} />
                        </Box>

                        <Box className={styles.stageWrapper} >
                            <Stage
                                shrink={0}
                                vm={vm}
                            />
                        </Box>

                        <Box className={styles.targetWrapper} >
                            <TargetPane
                                vm={vm}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
GUIComponent.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    onTabSelect: PropTypes.func,
    tabIndex: PropTypes.number,
    vm: PropTypes.instanceOf(VM).isRequired
};
GUIComponent.defaultProps = {
    basePath: '/'
};
module.exports = GUIComponent;
