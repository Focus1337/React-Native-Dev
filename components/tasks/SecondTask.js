import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";

export default function SecondTask() {
    return (
        <View style={styles.container}>
            <Name/>
            <Surname/>
            <Login/>
        </View>
    );
}

function Name() {
    const [name, setName] = useState('');

    return (
        <View style={{marginBottom: 20}}>
            <Text style={{marginVertical: 10}}>
                {name ? `Hi ${name}!` : 'What is your name?'}
            </Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={text => setName(text)}
            />
        </View>
    );
}

function Surname() {
    const [surname, setSurname] = useState('');

    return (
        <View style={{marginBottom: 20}}>
            <Text style={{marginVertical: 10}}>
                {surname ? `Hi ${surname}!` : 'What is your surname?'}
            </Text>
            <TextInput
                style={styles.inputStyle}
                onSubmitEditing={(event) => setSurname(event.nativeEvent.text)}
            />
        </View>
    );
}

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [logged, setLogged] = useState(false);
    const [hidden, setHidden] = useState(true);

    const login = () => {
        let name = "Focus";
        let pass = "123456";

        if (username !== '' && password !== '' && name === username && pass === password) {
            setLogged(true);
            setHidden(true);
        } else {
            setHidden(false);
        }
    };

    useEffect(() => {
        if (!hidden) {
            setTimeout(() => setHidden(true), 3000);
        }

        if (logged) {
            setTimeout(() => setLogged(false), 3000);
            setUsername('');
            setPassword('');
        }
    }, [hidden, logged]);

    return !logged ? (
            <View style={{borderWidth: 1, borderColor: "red", padding: 20}}>
                {!hidden && <Text style={{color: "red"}}>Incorrect username/password.</Text>}
                <Text style={{marginVertical: 16}}>Username</Text>
                <TextInput
                    style={styles.inputStyle}
                    textContentType="name"
                    onChangeText={(text) => setUsername(text)}
                    returnKeyType="next"
                />

                <Text style={{marginVertical: 16}}>Password</Text>
                <TextInput
                    style={[styles.inputStyle, {marginBottom: 16}]}
                    textContentType="password"
                    onChangeText={(text) => setPassword(text)}
                />

                <Button title='Log in' onPress={login}/>
            </View>
        )
        : (
            <View>
                <Text style={{fontWeight: "800", fontSize: 26}}>Welcome!</Text>
            </View>
        );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignContent: 'center',
        padding: 16,
        marginVertical: 60
    },

    inputStyle: {
        padding: 8,
        backgroundColor: '#f5f5f5'
    }
});
