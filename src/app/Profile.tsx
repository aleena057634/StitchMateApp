import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { getCurrentUserDetail } from "../../databse/table"
import { getProfileImage } from "../../databse/ImageCrud"
import ThemeContext from '@/context/ThemeContext';
import CustomAlert from '@/componenets/CustomAlert';
import { router } from 'expo-router';

export default function Profile() {

    const { theme } = useContext(ThemeContext);

    const [UserInfo, setUserInfo] = useState<any>(null);
    const [Profileimage, setProfile] = useState<string | null>(null);
    const [passAlert, setPassAlert] = useState(false);

    const getImage = async () => {
        const imageData = await getProfileImage();

        if (imageData != null) {
            setProfile(imageData);
        } else {
            console.log("\nFailed to load image");
        }
    }

    const getuser = async () => {
        const data = await getCurrentUserDetail();
        setUserInfo(data);
    }

    useEffect(() => {
        getuser();
        getImage();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>

            <View style={styles.profileContainer}>

                <View
                    style={[
                        styles.profileCircle,
                        {
                            borderColor: theme.primary,
                            backgroundColor: theme.card,
                        }
                    ]}
                >

                    {Profileimage ? (
                        <Image
                            source={{ uri: Profileimage }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <Ionicons
                            name="person"
                            size={40}
                            color={theme.primary}
                        />
                    )}

                </View>

                <Text style={[styles.title, { color: theme.text }]}>
                    {UserInfo?.NAME}
                </Text>

            </View>

            <View
                style={[
                    styles.AccountContainer,
                    { backgroundColor: theme.card }
                ]}
            >

                <Text style={[styles.NameText, { color: theme.text }]}>
                    Account Details
                </Text>

                {/* User ID */}
                <View
                    style={[
                        styles.detailRow,
                        { borderBottomColor: theme.border }
                    ]}
                >
                    <Ionicons
                        name="card-outline"
                        size={22}
                        color={theme.accent}
                        style={styles.icon}
                    />

                    <Text style={[styles.userText, { color: theme.text }]}>
                        User ID
                    </Text>

                    <Text style={[styles.UserId, { color: theme.text }]}>
                        {UserInfo?.ID}
                    </Text>
                </View>

                {/* Email */}
                <View
                    style={[
                        styles.detailRow,
                        { borderBottomColor: theme.border }
                    ]}
                >
                    <Ionicons
                        name="mail-outline"
                        size={22}
                        color={theme.accent}
                        style={styles.icon}
                    />

                    <Text style={[styles.userText, { color: theme.text }]}>
                        Email
                    </Text>

                    <Text style={[styles.UserId, { color: theme.text }]}>
                        {UserInfo?.EMAIL}
                    </Text>
                </View>

                {/* Phone */}
                <View
                    style={[
                        styles.detailRow,
                        { borderBottomColor: theme.border }
                    ]}
                >
                    <Ionicons
                        name="call-outline"
                        size={22}
                        color={theme.accent}
                        style={styles.icon}
                    />

                    <Text style={[styles.userText, { color: theme.text }]}>
                        Phone
                    </Text>

                    <Text style={[styles.UserId, { color: theme.text }]}>
                        {UserInfo?.PHONE}
                    </Text>
                </View>

            </View>

            <View style={styles.ButtonContainer}>

                <Pressable
                    style={[
                        styles.buttondesign,
                        { backgroundColor: theme.primary }
                    ]}
                >
                    <Ionicons
                        name="create-outline"
                        size={20}
                        color={theme.buttonText}
                    />

                    <Text style={[styles.buttonText, { color: theme.buttonText }]}>
                        Edit Info
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => { setPassAlert(true) }}
                    style={[
                        styles.buttondesign,
                        { backgroundColor: theme.primary }
                    ]}
                >
                    <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color={theme.white}
                    />

                    <Text style={[styles.buttonText, { color: theme.white }]}>
                        Change Password
                    </Text>
                </Pressable>

            </View>
            <CustomAlert
                visible={passAlert}
                title='Password Change'
                Message='Are You sure you want to change Password?'
                onCancel={() => { setPassAlert(false) }}
                onConfirm={() => {
                    router.push("/ChangePass")
                    setPassAlert(false)
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    profileContainer: {
        alignItems: "center",
        marginBottom: 15,
    },

    profileCircle: {
        marginTop: 80,
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    profileImage: {
        width: "100%",
        height: "100%",
    },

    container: {

        flex: 1,
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
    },

    AccountContainer: {
        borderRadius: 12,
        padding: 15,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    NameText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 55,
        borderBottomWidth: 1,
    },

    icon: {
        width: 35,
    },

    userText: {
        flex: 1,
        fontSize: 15,
    },

    UserId: {
        fontSize: 15,
        fontWeight: "500",
        maxWidth: "55%",
        textAlign: "right",
    },

    ButtonContainer: {
        flexDirection: "row",
        gap: 12,
        marginTop: 20,
    },

    buttondesign: {
        flex: 1,
        minHeight: 55,
        borderRadius: 12,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
    },

    buttonText: {
        fontSize: 14,
        fontWeight: "600",
    },
})