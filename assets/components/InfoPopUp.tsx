import * as React from 'react';
import { View, Modal, Text, Button, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function InfoPopUp({visible, setModalVisible, text} : InfoProps){
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000080' }}>
                <View style={{ backgroundColor: 'white', paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 5, borderRadius: 10, alignItems: 'center', justifyContent: "space-evenly", width: "80%"}}>
                    <Text style={{color: "#AFC689", fontFamily: 'Poppins-Regular',}}>{text}</Text>
                    <Button title="Done" onPress={() => setModalVisible(false)} color="#498C68"/>
                </View>
            </View>
        </Modal>
    )
}
interface InfoProps {
    visible: boolean,
    setModalVisible: Function,
    text: String
}