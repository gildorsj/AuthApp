import {
    StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: "space-around"
    },
    headerContainerStyle: {
        flex: 0.2,
        alignItems: "center"
    },
    headerTitleStyle: {
        color: "red",
        fontSize: 30,
        fontWeight: "bold"
    },
    formContainerStyle: {
        paddingHorizontal: 10,
        justifyContent: "space-around"
    },
    textInputStyle: {
        height: 60,
        marginVertical: 5,
        borderRadius: 6,
        paddingHorizontal: 10,
        backgroundColor: "transparent",
        borderColor: "#888",
        borderWidth: 1
    },
    signInButtonContainerStyle: {
        flex: 0.3,
        marginTop: 10,
        alignItems: "center",
        paddingHorizontal: 5
    },
    signInButtonStyle: {
        width: 130,
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 130 / 4,
        alignItems: "center",
        backgroundColor: "white",
        backgroundColor: "red",
    },
    signInButtonTextStyle: {
        color: "white",
        textAlign: "center",
        alignSelf: "center",
        fontSize: 17,
        fontWeight: "bold",
        marginHorizontal: 5
    },
    errorLabelContainerStyle: {
        flex: 0.1,
        alignItems: "center",
        justifyContent: "center"
    },
    errorTextStyle: {
        color: "red",
        textAlign: "center"
    },
    loginButtonContainerStyle: {
        flex: 0.2,
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    loginButtonStyle: {
        alignItems: "center"
    },
    loginButtonTextStyle: {
        color: "red"
    }
});

export default styles;