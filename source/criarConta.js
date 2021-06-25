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

export default function CriarConta(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isValid, setValid] = useState(true);
    const processar = () => {
        if (!password) {
            setError("Insira uma senha");
            setValid(false);
            return;
        } else if (!email) {
            setError("Insira um endereço de email");
            setValid(false);
            return;
        } else if (!password && password.trim() && password.length > 6) {
            setError("Senha curta, ela precisa ter pelo menos 6 caracteres");
            setValid(false);
            return;
        } else if (!emailValido(email)) {
            setError("Email inválido");
            setValid(false);
            return;
        }

        criar(email, password);
    };

    const emailValido = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const criar = async (email, password) => {
        try {
            let response = await auth().createUserWithEmailAndPassword(email, password);
            if (response && response.user) {
                Alert.alert("Conta criada com sucesso");
                props.action();
            }
        } catch (e) {
            console.error(e.message);
            if (e.message == '[auth/email-already-in-use] The email address is already in use by another account.') {
                setError("Este email já está sendo utilizado");
                setValid(false);
            }
        }
    };

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headerContainerStyle}>
                <Text style={styles.headerTitleStyle}> Criar conta </Text>
            </View>
            <View style={styles.formContainerStyle}>
                <TextInput
                    label={"Email"}
                    keyboardType="email-address"
                    style={styles.textInputStyle}
                    placeholder="Email"
                    onChangeText={text => {
                        setError;
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
                            flexDirection: "column",
                            justifyContent: "space-around"
                        }}
                    >
                        <Text style={styles.signInButtonTextStyle}>Criar conta</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
};
