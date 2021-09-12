import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { withTheme, Button, Dialog, TextInput, Portal, Surface } from 'react-native-paper';
//REDUX
import { connect } from 'react-redux';
import { createHabit } from '../redux/actions';

const styles = theme => StyleSheet.create({
    surface: {
        padding: theme.spacing.medium,
        margin: theme.spacing.medium,
    },
});

export const CreateHabit = (props) => {
    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [limit, setLimit] = useState('');

    const createHabit = () => {
        props.createHabit(title, limit);
        setShowDialog(false);
    }

    return (
        <Surface elevation={4} style={styles(props.theme).surface}>
            <Button onPress={() => setShowDialog(true)}>Create new habit</Button>
            <Portal>
                <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
                    <Dialog.Title>Create a habit</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Title"
                            onChangeText={(input) => setTitle(input)}
                        />
                        <TextInput
                            label="Daily limit"
                            onChangeText={(input) => setLimit(input)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setShowDialog(false)}>Cancel</Button>
                        <Button onPress={createHabit}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Surface>

    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        createHabit: (title, limit) => dispatch(createHabit((new Date()).valueOf(), title, limit))
    }
}

export default withTheme(connect(null, mapDispatchToProps)(CreateHabit));