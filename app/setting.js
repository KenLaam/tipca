/**
 * Created by ken on 3/4/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Picker,
    Navigator,
    AsyncStorage
} from 'react-native';

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sceneTransition: 0,
        };
    }

    componentDidMount() {
        this.getSceneTransition();
    }

    setSelectSceneTransition(scene) {
        try {
            this.setSceneTransition(scene);
            this.setState({
                sceneTransition: scene
            });
        } catch (error) {
            console.log("Oop!! Something went wrong !!!" + error);
        }
    }

    async setSceneTransition(scene) {
        try {
            await AsyncStorage.setItem('SCENE_SELECTED', scene);
            this.setState({
                sceneTransition: scene
            })
        } catch (error) {
            console.log("Hmm, something when wrong when set data..." + error);
        }
    }

    async getSceneTransition() {
        try {
            let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
            // Store value to State
            this.setState({
                sceneTransition: sceneTransitionValue
            });
        } catch (error) {
            console.log("Hmm, something when wrong when get data..." + error);
        }
    }

    render() {
        return (
            <View style={{marginTop: 50,padding: 10}}>
                <View>
                    <Text style={{fontSize:25}}>Scene Transitions</Text>
                    <Picker
                        selectedValue={this.state.sceneTransition}
                        onValueChange={(scene) => this.setSelectSceneTransition(scene)}>
                        <Picker.Item label="FloatFromRight" value="FloatFromRight"/>
                        <Picker.Item label="FloatFromLeft" value="FloatFromLeft"/>
                        <Picker.Item label="FloatFromBottom" value="FloatFromBottom"/>
                        <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid"/>
                        <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft"/>
                        <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump"/>
                        <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight"/>
                    </Picker>
                </View>
            </View >
        )
    }
}
module.exports = Setting;