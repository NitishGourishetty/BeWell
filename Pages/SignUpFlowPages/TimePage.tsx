import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, ScrollView, View, TouchableOpacity, StyleSheet, Text, Alert, Modal, Button } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { getSpecificHabit } from '../../lib/backend';
import InfoPopUp from '../../assets/components/InfoPopUp';

const height = Dimensions.get("window").height * 0.9;

export default function TimePage({ route, navigation }) {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    let data = [];
    const { habitInfo } = route.params;

    function confirmHabit() {
        navigation.navigate("PrivacySetup", {habitInfo: habitInfo, startTime: startTime, endTime: endTime});
    }

    useEffect(() => {
        console.log("Start Time:", `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    }, [startTime]);

    useEffect(() => {
        console.log("End Time:", `${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
        console.log(habitInfo)
    }, [endTime]);

    const onStartChange = (event: DateTimePickerEvent, date: Date) => {
        const {
            type,
            nativeEvent: { timestamp, utcOffset },
        } = event;
        if (date) {
            setStartTime(date)
        }
        else {
            alert("You did not pick a start time.")
        }
    };

    const onEndChange = (event, date) => {
        const {
            type,
            nativeEvent: { timestamp, utcOffset },
        } = event;
        if (event.type == "set") {
            setEndTime(date)
        }
        else {
            alert("You did not pick an end time.")
        }
    };

    const confirmTime = () => {
        if (endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) == startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) {
            alert("You cannot have the same start and end time, please pick a new one.")
        }
        else {
            Alert.alert(
                "Confirmation",
                `Start Time: ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\nEnd Time: ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                [
                    { text: 'Confirm', onPress: () => confirmHabit(), isPreferred: true },
                    { text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel' },
                ]
            )

        }
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{position: "absolute", alignSelf: "flex-end", top: 0, padding: 20}}>
                <FontAwesome name="info-circle" size={25} color="grey"/>
            </TouchableOpacity>
            <InfoPopUp 
                visible={modalVisible}
                setModalVisible={setModalVisible}
                text={"Start Time and End Time dictate when you can upload an image for this specific goal.\nTo promote strong habits, try and minimize the size of this time window.\n\nNote: The times cannot be the same"} />
            <View style={styles.content}>
                <Text style={styles.startTitle}>
                    {'Set Start Time'}
                </Text>
                <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={startTime ? startTime : new Date()}
                    onChange={onStartChange}
                    timeZoneName="America/Los_Angeles"
                    textColor="#498C68"
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.endTitle}>
                    {'Set End Time'}
                </Text>
                <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={endTime ? endTime : new Date()}
                    onChange={onEndChange}
                    timeZoneName="America/Los_Angeles"
                    textColor="#AFC689"
                />
                <TouchableOpacity style={styles.arrow} onPress={confirmTime} disabled={endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) == startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}>
                    <AntDesign name="arrowright" size={45} color={(endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) == startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) ? "lightgrey" : "black"}/>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "E6D6B8"
    },
    content: {
        width: "80%",
        alignItems: "center",
    },
    startTitle: {
        fontSize: height / 20,
        textAlign: "center",
        color: "#498C68",
        fontFamily: 'Poppins-SemiBold',
    },
    endTitle: {
        fontSize: height / 20,
        textAlign: "center",
        color: "#AFC689",
        fontFamily: 'Poppins-SemiBold',
    },
    button: {
        borderBottomColor: '#AFC689',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    arrow: {
        alignSelf: 'flex-end'
    }
});
