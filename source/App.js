import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import React, { Component, useEffect } from "react";
import { firebase } from "@react-native-firebase/auth";

import CriarConta from './criarConta';
import FazerLogin from './fazerLogin';
import styles from './assets/styles';

export default class App extends Component {

    state = {
        isLogin: false,
        authenticated: false
    };

    componentDidMount() {
        this.estaLogado();
    }

    estaLogado = () => {
        let user = firebase.auth().currentUser;
        if (user)
            this.setState({ authenticated: true });
        else
            this.setState({ authenticated: false });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.authenticated ? (
                    <View style={styles.containerStyle}>
                        <Text style={{ textAlign: "center" }}>Email{'\n'}{firebase.auth().currentUser.email} </Text>

                        <View style={styles.loginButtonContainerStyle}>
                            <TouchableOpacity
                                style={styles.loginButtonStyle}
                                onPress={async () => {
                                    await firebase.auth().signOut();
                                    await this.estaLogado();
                                }}
                            >
                                <Text style={styles.loginButtonTextStyle}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        {this.state.isLogin ? <FazerLogin action={() => this.estaLogado()} /> : <CriarConta action={() => this.estaLogado()} FazerLogin />}

                        <View style={styles.loginButtonContainerStyle}>
                            <TouchableOpacity style={styles.loginButtonStyle} onPress={() => this.setState(state => ({ isLogin: !state.isLogin }))}>
                                <Text style={styles.loginButtonTextStyle}> {this.state.isLogin ? "Novo aqui? Crie uma conta" : "Já tem conta? Faça login"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}



