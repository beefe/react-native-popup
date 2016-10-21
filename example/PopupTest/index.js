/**
 * Bootstrap of PopupTest
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';

import Popup from 'react-native-popup';

export default class PopupTest extends Component {

    constructor(props, context) {
        super(props, context);
    }

    _alertTest() {
        this.popup.alert('hello alert');
    }

    _alertMultilineTest() {
        this.popup.alert('hello multiline alert', 'hello multiline alert', 'hello multiline alert');
    }

    _tipTest() {
        this.popup.tip({
            title: 'hello tip',
            content: ['this is a hello tip', 'this is a hello tip'],
            btn: {
                text: 'ok',
                style: {
                    color: 'red'
                },
                callback: () => {
                    this.popup.alert('thank you, byebye')
                }
            }
        });
    }

    _confirmTest() {
        this.popup.confirm({
            title: 'hello confirm',
            content: ['this is a hello confirm', 'this is a hello confirm'],
            ok: {
                text: 'yes',
                style: {
                    color: 'green',
                    fontWeight: 'bold'
                },
                callback: () => {
                    this.popup.alert('thank u 😬');
                }
            },
            cancel: {
                text: 'no',
                style: {
                    color: 'red'
                },
                callback: () => {
                    this.popup.alert('bad man 👿');
                }
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.oddBtn} onPress={this._alertTest.bind(this)}>
                    <Text style={styles.oddBtnText}>alert</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.EvenBtn} onPress={this._alertMultilineTest.bind(this)}>
                    <Text style={styles.EvenBtnText}>multiline alert</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.oddBtn} onPress={this._tipTest.bind(this)}>
                    <Text style={styles.oddBtnText}>tip</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.EvenBtn} onPress={this._confirmTest.bind(this)}>
                    <Text style={styles.EvenBtnText}>confirm</Text>
                </TouchableOpacity>

                {/** Popup component */}
                <Popup ref={popup => this.popup = popup }/>

            </View>
        );
    }
};

let styles = StyleSheet.create({

    container: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    oddBtn: {
        borderRadius: 5,
        padding: 5,
        marginTop: 10,
        position: 'relative',
        backgroundColor: 'blue',
    },
    EvenBtn: {
        borderRadius: 5,
        padding: 5,
        marginTop: 10,
        position: 'relative',
        backgroundColor: 'green'
    },
    oddBtnText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    EvenBtnText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    }
});