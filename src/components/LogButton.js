import React, { useState, useEffect } from 'react';
import { withTheme, Card, Button, Title, Paragraph, Dialog, TextInput, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';
//REDUX
import { connect } from 'react-redux';
import { incrementCount, resetCount, setLimit } from '../redux/actions';
import { hasReachedDailyLimitSelector } from '../redux/selectors';

const styles = theme => StyleSheet.create({
    card: {
        margin: theme.spacing.medium,
    },
    button: {
        width: '48%',
        marginHorizontal: '1%'
    }
});

//TODO: NUMBER VALIDATION

export const LogButton = (props) => {
    const [showDialog, setShowDialog] = useState(false);
    const [limit, setLimit] = useState('');

    const updateLimit = () => {
        props.updateLimit(limit);
        setShowDialog(false);
    }

    useEffect(() => {
        var midnight = new Date();
        midnight.setUTCHours(0, 0, 0, 0);
        if (new Date(props.lastUpdated) < midnight) {
            props.resetCount();
        }
    });

    return (
        <Card elevation={3} id={props.id} style={styles(props.theme).card}>
            <Card.Content>
                <Title>{props.habit.title}</Title>
                <Paragraph>{props.habit.count} / {props.habit.limit}</Paragraph>
                <Paragraph>Last logged: {props.updatedDisplay}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button style={styles(props.theme).button} mode='contained' disabled={props.hasReachedLimit} onPress={props.incrementCount}>+</Button>
                <Button style={styles(props.theme).button} mode='contained' onPress={() => setShowDialog(true)}>Set Limit</Button>
            </Card.Actions>
            <Portal>
                <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
                    <Dialog.Title>Choose a daily limit</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Daily limit"
                            onChangeText={(input) => setLimit(input)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setShowDialog(false)}>Cancel</Button>
                        <Button onPress={updateLimit}>Ok</Button>
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
        hasReachedLimit: habit ? hasReachedDailyLimitSelector(state.habits, ownProps.id) : {},
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        incrementCount: () => dispatch(incrementCount({ updated: (new Date()).valueOf(), habitId: ownProps.id })),
        resetCount: () => dispatch(resetCount({ updated: (new Date()).valueOf(), habitId: ownProps.id })),
        updateLimit: (limit) => dispatch(setLimit({ updated: (new Date()).valueOf(), limit: limit, habitId: ownProps.id }))
    }
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(LogButton));