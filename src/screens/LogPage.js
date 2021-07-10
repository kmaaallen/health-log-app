import React from 'react';
import { Text, View } from 'react-native';
//components
import LogButton from '../components/LogButton';


function LogPage() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Log Page</Text>
            <LogButton />
        </View>
    );
}

export default LogPage;