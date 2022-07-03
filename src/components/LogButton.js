import React, { useState, useEffect } from 'react';
import { withTheme, Card, Button, Title, Paragraph, Dialog, TextInput, Portal, Chip } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
//REDUX
import { connect } from 'react-redux';
import { incrementCount, resetCount, deleteHabit } from '../redux/actions';
import { hasReachedFrequencyLimitSelector } from '../redux/selectors';
//NAVIGATION
import { useNavigation } from '@react-navigation/native';
// UTILS
import { getResetDateTime } from '../dateUtils';

const styles = theme => StyleSheet.create({
    card: {
        margin: theme.spacing.medium,
    },
    button: {
        width: 'auto',
        marginHorizontal: '1%'
    },
    chipView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
});

//TODO: NUMBER VALIDATION

export const LogButton = (props) => {
    const navigation = useNavigation();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const switchScreen = (screen, habitId) => {
        navigation.navigate(screen, { habit: habitId });
    }

    const deleteHabit = () => {
        props.deleteHabit();
        setShowDeleteDialog(false);
    }

    useEffect(() => {
        // Get reset date time
        if (new Date(props.lastUpdated) < getResetDateTime(props.habit.frequency)) {
            props.resetCount();
        }
    }, []);

    return (
        <Card elevation={3} id={props.id} style={styles(props.theme).card}>
            <Card.Content>
                <Title>{props.habit.title}</Title>
                {props.habit.category ? <View style={styles(props.theme).chipView}><Chip>{props.habit.category}</Chip></View> : null}
                <Paragraph>{props.habit.count} / {props.habit.limit} {props.habit.frequency}</Paragraph>
                <Paragraph>Last logged: {props.updatedDisplay}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button style={styles(props.theme).button} mode='contained' disabled={props.hasReachedLimit} onPress={props.incrementCount}>+</Button>
                <Button style={styles(props.theme).button} mode='contained' onPress={() => switchScreen('Edit', props.habit.id)}>Edit</Button>
                <Button style={styles(props.theme).button} mode='contained' color={props.theme.colors.danger} onPress={() => setShowDeleteDialog(true)}>Delete</Button>
                <Button style={styles(props.theme).button} mode='contained' onPress={() => switchScreen('Report', props.habit.id)}>Report</Button>
            </Card.Actions>

            <Portal>
                <Dialog visible={showDeleteDialog} onDismiss={() => setShowDeleteDialog(false)}>
                    <Dialog.Title>Are you sure?</Dialog.Title>
                    <Dialog.Actions>
                        <Button onPress={() => setShowDeleteDialog(false)}>Cancel</Button>
                        <Button onPress={deleteHabit}>Yes</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Card >
    );
};

function mapStateToProps(state, ownProps) {
    const habit = state.habits.habits[ownProps.id];
    const lastIncrementLog = habit ? habit.log.filter((log) => { return log.info.type == 'increment' }).slice(-1) : [];
    var event = lastIncrementLog[0];
    return {
        habit: habit,
        lastUpdated: event ? event.updated : null,
        updatedDisplay: event ? (new Date(event.updated)).toLocaleString() : 'Never',
        hasReachedLimit: habit ? hasReachedFrequencyLimitSelector(state.habits, ownProps.id) : {},
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        incrementCount: () => dispatch(incrementCount({ updated: (new Date()).valueOf(), habitId: ownProps.id })),
        resetCount: () => dispatch(resetCount({ updated: (new Date()).valueOf(), habitId: ownProps.id })),
        deleteHabit: () => dispatch(deleteHabit({ habitId: ownProps.id }))
    }
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(LogButton));