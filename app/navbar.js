/**
 * Created by ken on 3/5/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';

import Calculator from "./calculator"
import Setting from "./setting"

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sceneTransition: Navigator.SceneConfigs.FloatFromRight
        };
    }

    async getSceneTransition() {
        try {
            let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
            // Store value to State
            switch (sceneTransitionValue) {
                case "FloatFromLeft":
                    this.setState({
                        sceneTransition: Navigator.SceneConfigs.FloatFromLeft
                    });
                    break;
                case "FloatFromBottom":
                    this.setState({
                        sceneTransition: Navigator.SceneConfigs.FloatFromBottom
                    });
                    break;
                case "FloatFromBottomAndroid":
                    this.setState({
                        sceneTransition: Navigator.SceneConfigs.FloatFromBottomAndroid
                    });
                    break;
                case "SwipeFromLeft":
                    this.setState({
                        sceneTransition: Navigator.SceneConfigs.SwipeFromLeft
                    });
                    break;
                case "HorizontalSwipeJump":
                    this.setState({
                        sceneTransition: Navigator.SceneConfigs.HorizontalSwipeJump
                    });
                    break;
                case "HorizontalSwipeJumpFromRight":
                    this.setState({
                        sceneTransition: Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
                    });
                    break;
                default:
                    this.setState({
                        sceneTransition: Navigator.SceneConfigs.FloatFromRight
                    });
                    break;
            }
        } catch (error) {
            console.log("Hmm, something when wrong when get data..." + error);
        }
    }

    configureScene(route, routeStack) {
        this.getSceneTransition();
        return this.state.sceneTransition;
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'CalculatorPage':
                return (
                    <Calculator navigator={navigator}/>
                );
            case 'SettingPage':
                return (
                    <Setting navigator={navigator}/>
                );
            default:
        }
    }

    render() {
        var navigationBar = (
            <Navigator.NavigationBar
                routeMapper={{
          LeftButton: (route, navigator, index, navState) =>{
            return
          },
          RightButton: (route, navigator, index, navState) => {
              switch (route.id) {
                  case 'SettingPage':
                       return (
                            <TouchableOpacity onPress={() => navigator.pop()}>
                            <Text>Save</Text>
                            </TouchableOpacity>
                       );
                      break;
                  case 'CalculatorPage':
                    return (
                        <TouchableOpacity onPress={() => navigator.push({id: 'SettingPage'})}>
                            <Text>Setting</Text>
                        </TouchableOpacity>
                    );
                    break;
              }
          },
          Title: (route, navigator, index, navState) => {
            return;
          },
        }}/>
        )

        return (
            <Navigator
                initialRoute={{id: 'CalculatorPage'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                navigationBar={navigationBar}
                configureScene={this.configureScene.bind(this)}
            />
        );
    }
}
module.exports = NavBar;
