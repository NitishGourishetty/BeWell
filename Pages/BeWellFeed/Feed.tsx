import * as React from 'react'
import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { getUsersHabits } from '../../lib/backend'

export default function Feed({ session }) {

    async function getHabits() {
        const data = await getUsersHabits(session);
        console.log(data);
    }

    useEffect(() => {
        getHabits();
    }, []);

    return (
        <View>

        </View>
    )
}