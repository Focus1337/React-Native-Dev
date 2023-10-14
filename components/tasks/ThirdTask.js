import {View, Text, StyleSheet, TextInput, Pressable} from "react-native";
import React, {useEffect, useState} from "react";

export default function ThirdTask() {
    let [boxes, setBoxes] = useState([]);

    let addBox = (size, color, borderColor) => {
        setBoxes([...boxes, {width: size, height: size, color: color, borderColor: borderColor}]);
    };

    let clear = () => setBoxes([]);

    return (
        <View style={styles.container}>
            <BoxContainer boxes={boxes}/>
            <Controls addBox={addBox} clear={clear}/>
        </View>
    );
};

function BoxContainer(props) {
    let boxes = props.boxes.map(box => <Box
        key={Date.now() * Math.random()}
        width={box.width}
        height={box.height}
        color={box.color}
        borderColor={box.borderColor}/>);

    return (
        <View style={styles.boxContainer}>
            {boxes}
        </View>
    )
}

function Controls(props) {
    let [size, setSize] = useState(50);
    let [color, setColor] = useState('');
    let [borderColor, setBorderColor] = useState('');

    let pickers = [
        {color: 'lightyellow', borderColor: '#FFC107'},
        {color: '#B3E5FC', borderColor: '#0288D1'},
        {color: '#FFCDD2', borderColor: '#F44336'}
    ];

    let colorPickers = pickers.map(cp => {
        return <ColorPicker key={Date.now() * Math.random()} color={cp.color} borderColor={cp.borderColor}
                            onPress={() => colorPickerHandler(cp.color, cp.borderColor)}/>
    });

    let addBox = function () {
        props.addBox(size, color, borderColor);
    }

    let colorPickerHandler = function (color, borderColor) {
        setColor(color);
        setBorderColor(borderColor);
    };

    useEffect(() => {
        colorPickerHandler(pickers[0].color, pickers[0].borderColor);
    }, []);

    return (
        <View style={styles.controlsContainer}>
            <View style={styles.controlsRow}>
                <View>
                    <Text style={styles.controlsText}>Размер</Text>
                </View>
                <TextInput keyboardType="numeric" style={[styles.inputStyle]} defaultValue='50'
                           onChangeText={size => setSize(parseInt(size))}></TextInput>
                <View style={{flex: 1}}/>
            </View>
            <View style={styles.controlsRow}>
                <View style={{flex: 1}}>
                    <Text style={styles.controlsText}>Цвет</Text>
                </View>
                {colorPickers}
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                <Button title="Добавить" onPress={addBox}></Button>
                <Button title="Очистить" onPress={props.clear}></Button>
            </View>
        </View>
    );
}

function Box(props) {
    return (
        <View style={{
            width: props.width,
            height: props.height,
            backgroundColor: props.color,
            borderWidth: 1,
            borderColor: props.borderColor
        }}/>
    );
}

function ColorPicker(props) {
    const {onPress, color, borderColor} = props;
    return (
        <Pressable style={[styles.colorPicker, {backgroundColor: color, borderColor: borderColor}]}
                   onPress={onPress}/>
    );
}

function Button(props) {
    const {onPress, title = 'Save'} = props;
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 40,
    },

    boxContainer: {
        flex: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: 'flex-start',
        padding: 16,
        gap: 10,
    },

    controlsContainer: {
        flex: 3,
        padding: 16,
        gap: 20,
        alignContent: 'center',
    },

    controlsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end',
        marginHorizontal: 12,
        gap: 20
    },

    controlsText: {
        fontWeight: "600",
        fontSize: 18,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'black',
    },

    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    inputStyle: {
        padding: 8,
        borderWidth: 1,
        minWidth: 80,
        borderStyle: "solid",
        borderColor: "black",
        borderRadius: 8,
        fontSize: 18,
    },

    colorPicker: {
        width: 60,
        height: 40,
        borderWidth: 1,
        borderRadius: 8
    }
});
