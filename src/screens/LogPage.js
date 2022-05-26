import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Paragraph, withTheme } from 'react-native-paper';
//components
import LogButton from '../components/LogButton';
//REDUX
import { connect } from 'react-redux';

const styles = theme => StyleSheet.create({
    topText: {
        textAlign: 'center',
        paddingTop: 5
    }
});

function LogPage(props) {
    const habitButtons = props.habits ? Object.keys(props.habits) : [];
    const countMsg = `You have ${habitButtons.length} active habits`;

    return (
        <ScrollView>
            <Paragraph style={styles(props.theme).topText}>{countMsg}</Paragraph>
            {habitButtons.map((item) => (<LogButton id={item} key={item} />))}
        </ScrollView>
    );
}

const mapStateToProps = (state) => ({
    habits: state.habits.habits
})

export default withTheme(connect(mapStateToProps)(LogPage));