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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', paddingTop: 20, paddingLeft: 20, paddingRight: 20, borderRadius: 10, alignItems: 'center', justifyContent: "space-evenly" }}>
                    <Text>{text}</Text>
                    <Button title="Done" onPress={() => setModalVisible(false)} />
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