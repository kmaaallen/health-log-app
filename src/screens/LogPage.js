import React from 'react';
import { ScrollView } from 'react-native';
//components
import LogButton from '../components/LogButton';
import CreateHabit from '../components/CreateHabit';
//REDUX
import { connect } from 'react-redux';

function LogPage({ habits }) {
    const habitButtons = habits ? Object.keys(habits) : [];

    return (
        <ScrollView>
            <CreateHabit />
            {habitButtons.map((item) => (<LogButton id={item} key={item} />))}
        </ScrollView>
    );
}

const mapStateToProps = (state) => ({
    habits: state.habits.habits
})

export default connect(mapStateToProps)(LogPage);