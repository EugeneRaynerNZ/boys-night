import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import Logo from '../assets/logo.png'

export default function HeaderLogo() {

    return (
        <View style={styles.header}>
            <Image source={Logo} style={styles.headerImage} />
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
        width: 200,
        height: 43
    },
});