import { View, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

// TxtInputField for general text input
const TxtInputField = ({ icon, value, onChangeText, placeholder, keyboardType }) => {


    return (
        <View style={[styles.textInputContainer, boxShadow]}>
            {icon && React.cloneElement(icon, { style: styles.iconStyle })}
            <TextInput
                style={styles.textInput}
                keyboardType= { keyboardType }
                secureTextEntry={false}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor='#d1d1d1'
            />
        </View>
    )
}


// PasswordInputField with show/hide password feature
const PasswordInputField = ({ secureTextEntry, icon, icon1, onPress, value, onChangeText, placeholder, onBlur, onFocus }) => {
    return (
        <View style={[styles.textInputContainer, { zIndex: -1 }, boxShadow]}>
             {icon}
            <TextInput
                style={[styles.textInput, { paddingRight: 50 }]}
                keyboardType="default"
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                value={value}
                placeholderTextColor='#d1d1d1'
                onBlur={onBlur}
                onFocus={onFocus}
                onChangeText={onChangeText}
            />

            <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }} onPress={onPress} >
                {icon1}
            </TouchableOpacity>
        </View>
    )
}


//styles
const boxShadow = {
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
};


const styles = StyleSheet.create({
    textInputContainer: {
        width: Dimensions.get('window').width - 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#fff',
    },

    textInput: {
        width: '100%',
        height: '100%',
        paddingLeft: 50,
        color: '#000',
        fontSize: 13,
        paddingRight: 10,
    },

    iconStyle: {
        position: 'absolute',
        fontSize: 40,
        left: 10,
        top: 5,
    },
})



export { TxtInputField, PasswordInputField }