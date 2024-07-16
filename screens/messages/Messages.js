import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react' ; 
import { Alert, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import profile from '../../assets/profile.png';
import groupIcon from '../../assets/group.png';
import messages from '../../assets/messages.png';
import { RFValue } from 'react-native-responsive-fontsize';
import { chats } from '../../services/dummyService'; // Importing chats array
import { capitalizeFirstLetter, colors } from '../../GlobalStyles';
import { getAllUser } from '../../services/signin';
import wallpaper from '../../assets/wallpaper.png';
import { webURL } from '../../services/BaseURL';
import NewConvo from './components/NewConvo';
import { createConversation, createGroupConversation, getAllConvo } from '../../services/Conversation';
import { useFocusEffect } from '@react-navigation/core';
// import {useSelector } from 'react-redux';
import moment from 'moment';
// import { useDispatch } from 'react-redux';
// import { fetchConversation } from '../../redux/conversationSlice';
import NewGroup from './components/NewGroup';
import AlertBox from '../../components/AlertBox';
import { FloatingAction } from "react-native-floating-action";

const actions = [
    {
        text: "Chat",
        icon: messages,
        name: "Chat",
        position: 2,
        color: colors.light
    },
    {
        text: "Groups",
        icon: groupIcon,
        name: "Groups",
        position: 1,
        color: colors.light
    },
];

const Messages = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [convo, setConvo] = useState(chats); // Using chats array
    const [friendId, setFriendId] = useState([]);
    const [newConvoModal, setNewConvoModal] = useState(false);
    const [newGroupModal, setNewGroupModal] = useState(false);
    // const userDetail = useSelector(state => state?.userDetail.userDetail)
    // const dispatch = useDispatch();
    const [friendsData, setFriendsData] = useState();
    const [message, setMessage] = useState('');
    const [alertBox, setAlertBox] = useState(false);
    const [title, setTitle] = useState("");

    useEffect(() => {
        getAllUser().then((res) => {
            setUsers(res.data.users);
        });
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getAllConvo().then((res) => {
                console.log(res.data.friendsData);
                setFriendsData(res.data.friendsData);
                setConvo(res.data.conversation);
            });

            return () => null;
        }, [navigation])
    );

    const handleSelect = (item) => {
        let data = {
            receiverID: item._id
        };
        createConversation(data).then((response) => {
            if (response.data.status) {
                navigation.navigate("chat", { convoId: response.data.conversation, receiver: item._id, friendName: `${item.firstName} ${item.lastName}` });
                setNewConvoModal(false);
                // dispatch(fetchConversation());
            } else {
                const blocked = response.data.conversation.blockedUser.find(item => item == userDetail._id);
                if (blocked) {
                    setTitle("Error");
                    setAlertBox(true);
                    setMessage("You have been blocked by this user");
                    return;
                }
                // navigation.navigate("chat", { convoId: response.data.conversation, receiver: item._id, friendName: `${item.firstName} ${item.lastName}` });
                // setNewConvoModal(false);
            }
        });
    };

    const handleCreateGroup = (data) => {
        data.members.push(userDetail._id);
        createGroupConversation(data).then((res) => {
            console.log(res.data);
        });
    };

    const onStartChat = (item) => {
        // const blocked = item.blockedUser.find(item => item == userDetail._id);
        // if (blocked) {
        //     setTitle("Error");
        //     setAlertBox(true);
        //     setMessage("You have been blocked by this user");
        //     return;
        // }
        navigation.navigate("chat", { convoId: item, receiver: item.testingMembers[0]._id, friendName: `${item.testingMembers[0].firstName} ${item.testingMembers[0].lastName}`, userDetail: userDetail });
    };

    const onStartGroupChat = (item) => {
        const blocked = item.blockedUser.find(item => item == userDetail._id);
        if (blocked) {
            setTitle("Error");
            setAlertBox(true);
            setMessage("You have been blocked by this user");
            return;
        }
        navigation.navigate("groupChat", { convoId: item, receiver: item.testingMembers, friendName: `${item.groupName}` });
    };

    const isDeleted = (item) => {
        // Implement deletion logic here if needed
    };

    return (
        <ImageBackground
            source={wallpaper}
            imageStyle={{ width: "100%", height: "100%", resizeMode: "cover" }}
            style={{ height: "100%", backgroundColor: "white" }}
        >
            <AlertBox
                alertBox={alertBox}
                setAlertBox={setAlertBox}
                title={title}
                message={message}
            />
            <Header heading={"Messages"} onBack={() => navigation.navigate("HOME")} />
            {
                newConvoModal ?
                    <NewConvo
                        modalVisible={newConvoModal}
                        users={users}
                        handleSelect={handleSelect}
                        setModalVisible={setNewConvoModal} /> : null
            }
            {
                newGroupModal ?
                    <NewGroup
                        modalVisible={newGroupModal}
                        users={users}
                        handleSelect={handleCreateGroup}
                        setModalVisible={setNewGroupModal} /> : null
            }
            <ImageBackground
                source={wallpaper}
                imageStyle={{ width: "100%", height: "100%", resizeMode: "cover" }}
                style={styles.messageContainer}
            >
                {
                    convo.length > 0 ?
                        <FlatList
                            data={convo}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.userName}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => onStartChat(item)}
                                    style={styles.chatContainer}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ width: "15%" }}>
                                            <Image
                                                source={item.userProfile}
                                                style={styles.userPic}
                                            />
                                        </View>
                                        <View style={{ width: "75%", justifyContent: "space-evenly" }}>
                                            <Text style={{ fontSize: RFValue(13), fontWeight: "bold" }}>{item.userName}</Text>
                                            <Text>{item.lastMessage}</Text>
                                        </View>
                                        <View style={{ width: "10%", alignItems: "center", justifyContent: "flex-end" }}>
                                            <Text>{item.time}</Text>
                                            {item.unRead > 0 && (
                                                <View style={styles.unRead}>
                                                    <Text style={{ color: "white" }}>{item.unRead}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.divider} />
                                </TouchableOpacity>
                            )}
                        /> : null
                }
            </ImageBackground>
            <FloatingAction
                actions={actions}
                color={colors.light}
                onPressItem={(name) => {
                    if (name == "Chat") {
                        setNewConvoModal(true);
                    } else {
                        navigation.navigate("createGroup");
                    }
                }}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    messageContainer: {
        height: "80%",
        padding: "2%", paddingHorizontal: "5%",
        backgroundColor: "white"
    },
    chatContainer: {
        height: RFValue(70)
    },
    divider: {
        height: RFValue(1),
        alignSelf: "center",
        width: "90%",
        backgroundColor: "lightgrey",
        marginTop: "2%"
    },
    userPic: {
        height: RFValue(40),
        width: RFValue(40),
        borderRadius: 100,
        marginTop: "15%",
        marginBottom: "10%",
        overflow: "hidden",
    },
    unRead: {
        backgroundColor: colors.light,
        paddingHorizontal: "20%",
        paddingVertical: "8%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Messages;