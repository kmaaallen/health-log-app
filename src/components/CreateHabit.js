import React, { Component } from 'react';
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

export class CreateHabit extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false, tempTitle: '', tempLimit: '' };
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.createHabit = this.createHabit.bind(this);
        this.setTempTitle = this.setTempTitle.bind(this);
        this.setTempLimit = this.setTempLimit.bind(this);
    }

    showDialog = () => this.setState({ visible: true });

    hideDialog = () => this.setState({ visible: false });

    setTempTitle = (title) => { this.setState({ tempTitle: title }) };

    setTempLimit = (limit) => { this.setState({ tempLimit: limit }) };

    createHabit = () => {
        this.props.createHabit(this.state.tempTitle, this.state.tempLimit);
        this.hideDialog();
    }

    render() {
        return (
            <Surface elevation={4} style={styles(this.props.theme).surface}>
                <Button onPress={this.showDialog}>Create new habit</Button>
                <Portal>
                    <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
                        <Dialog.Title>Create a habit</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label="Title"
                                onChangeText={(title) => this.setTempTitle(title)}
                            />
                            <TextInput
                                label="Daily limit"
                                onChangeText={(limit) => this.setTempLimit(limit)}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={this.hideDialog}>Cancel</Button>
                            <Button onPress={this.createHabit}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Surface>

        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createHabit: (title, limit) => dispatch(createHabit((new Date()).valueOf(), title, limit))
    }
}

export default withTheme(connect(null, mapDispatchToProps)(CreateHabit));