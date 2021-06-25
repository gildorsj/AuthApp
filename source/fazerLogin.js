import {
    Text,
    View,
    SafeAreaView,
    TouchableHighlight,
    TextInput,
    Alert
} from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import styles from './assets/styles';

export default function FazerLogin(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isValid, setValid] = useState(true);
    const processar = () => {
        if (!password) {
            setError("Insira a senha");
            setValid(false);
            return;
        } else if (!email) {
            setError("Insira seu endereço de email");
            setValid(false);
            return;
        } else if (password.length < 6) {
            setError("Senha curta, ela tem pelo menos 6 caracteres");
            setValid(false);
            return;
        } else if (!emailValido(email)) {
            setError("Email inválido");
            setValid(false);
            return;
        }
        let signInRequestData = {
            email,
            password
        };

        logar(email, password);
    };

    const emailValido = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const logar = async (email, password) => {
        try {
            let response = await auth().signInWithEmailAndPassword(email, password);
            if (response && response.user) {
                Alert.alert("Logado com sucesso");
                props.action();
            }
        } catch (e) {
            console.error(e.message);
            if (e.message == '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.') {
                setError("Usuário não encontrado");
                setValid(false);
            }
            if (e.message == '[auth/wrong-password] The password is invalid or the user does not have a password.') {
                setError("Senha incorreta");
                setValid(false);
            }
        }
    };

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerContainerStyle}>
                <Text style={styles.headerTitleStyle}>Entrar</Text>
            </View>
            <View style={styles.formContainerStyle}>
                <TextInput
                    label={"Email"}
                    keyboardType="email-address"
                    style={styles.textInputStyle}
                    placeholder="Email"
                    onChangeText={text => {
                        setValid(emailValido(text));
                        setEmail(text);
                    }}
                    error={isValid}
                />
                <TextInput
                    label={"Password"}
                    secureTextEntry
                    style={styles.textInputStyle}
                    placeholder="Senha"
                    error={isValid}
                    onChangeText={text => setPassword(text)}
                />
            </View>
            {error ? (
                <View style={styles.errorLabelContainerStyle}>
                    <Text style={styles.errorTextStyle}>{error}</Text>
                </View>
            ) : null}

            <View style={styles.signInButtonContainerStyle}>
                <TouchableHighlight style={styles.signInButtonStyle} onPress={processar}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around"
                        }}
                    >
                        <Text style={styles.signInButtonTextStyle}>Entrar</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
};
