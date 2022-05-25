import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
//components
import LogButton from '../components/LogButton';
//REDUX
import { connect } from 'react-redux';

function LogPage({ habits, navigation }) {
    const habitButtons = habits ? Object.keys(habits) : [];

    return (
        <ScrollView>
            <Button onPress={() => navigation.navigate('New')}>Create new habit</Button>
            {habitButtons.map((item) => (<LogButton id={item} key={item} />))}
        </ScrollView>
    );
}

const mapStateToProps = (state) => ({
    habits: state.habits.habits
})

export default connect(mapStateToProps)(LogPage);