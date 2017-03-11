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
    Button
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab'


export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billAmount: 0,
            tipAmount: 0,
            totalAmount: 0,
            selectedPercent: 0
        };
    }

    percentsArray() {
        return ["10%", "20%", "50%"];
    }


    updateBill(amount, index) {
        amount = parseFloat(amount);

        if (!index && index != 0) {
            index = this.state.selectedPercent
        }
        var percent = this.percentsArray()[index];
        percent = parseFloat(percent) / 100;

        this.setState({
            billAmount: amount,
            tipAmount: amount * percent,
            totalAmount: amount * (1 + percent),
        })
    }


    updatePercent(index) {
        this.setState({
            selectedPercent: index
        });

        this.updateBill(this.state.billAmount, index)
    }

    render() {
        return (
            <View>
                <View>
                    <Text style={styles.title}>Tip Calculator</Text>
                </View>

                <View>
                    <Text>Bill amount:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        autoFocus={true}
                        onChangeText={(amount) => this.updateBill(amount)}
                    />
                </View>

                <SegmentedControlTab
                    values={this.percentsArray()}
                    onTabPress={index => this.updatePercent(index)}/>

                <View>
                    <Text>Bill input: {this.state.billAmount}</Text>
                    <Text>Tip amount: {this.state.tipAmount}</Text>
                    <Text>Total amount: {this.state.totalAmount}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: '#F5FCFF',
    },

    title: {
        fontWeight: 'bold',
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    input: {
        height: 40,
    }

});

module.exports = Calculator;