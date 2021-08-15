import React from 'react';
import { Text, View } from 'react-native';
//components
import { LogButton } from '../components/LogButton';
//REDUX
import { connect } from 'react-redux';


function LogPage({ habits }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Log Page</Text>

            {habits ? Object.keys({ habits }).map((habit) => {
                return <LogButton id={habit.id} key={habit.id} />
            }) : null}

        </View>
    );
}

const mapStateToProps = (state) => ({
    habits: state.count.habits
})

export default connect(mapStateToProps)(LogPage);