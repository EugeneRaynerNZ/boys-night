import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import LoginLogo from '../assets/login-logo2.png'

export default function HeaderLogo() {

    return (
        <View style={styles.header}>
            <Image source={LoginLogo} style={styles.headerImage} />
        </View>
    )
  }

const styles = StyleSheet.create({
    header: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 24,
        paddingBottom: 16
    },
    headerImage: {
        width: 201,
        height: 39
    },
});