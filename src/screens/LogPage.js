import React from 'react';
import { ScrollView } from 'react-native';
import { Provider } from 'react-native-paper';
//components
import LogButton from '../components/LogButton';
import CreateHabit from '../components/CreateHabit';
//REDUX
import { connect } from 'react-redux';


function LogPage({ habits }) {
    const habitButtons = habits ? Object.keys(habits) : [];

    return (
        <Provider>
            <ScrollView>
                <CreateHabit />
                {habitButtons.map((item) => (<LogButton id={item} key={item} />))}
            </ScrollView>
        </Provider>
    );
}

const mapStateToProps = (state) => ({
    habits: state.count.habits
})

export default connect(mapStateToProps)(LogPage);