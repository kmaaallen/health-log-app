import React, { Component } from 'react';
import { Card, Button, Title, Paragraph, Dialog, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
//REDUX
import { connect } from 'react-redux';
import { incrementCount, resetCount, setLimit } from '../redux/actions';
import { hasReachedDailyLimitSelector } from '../redux/selectors';

const styles = StyleSheet.create({
    container: {
        height: 150,
    }
});

//TODO: NUMBER VALIDATION

export class LogButton extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false, tempLimit: 0 };
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.setLimit = this.setLimit.bind(this);
    }

    showDialog = () => this.setState({ visible: true });

    hideDialog = () => this.setState({ visible: false });

    setTempLimit = (limit) => { this.setState({ tempLimit: limit }) };

    setLimit = () => {
        this.props.setLimit(this.state.tempLimit);
        this.hideDialog();
    }

    componentDidMount() {
        var midnight = new Date();
        midnight.setUTCHours(0, 0, 0, 0);
        if (new Date(this.props.updated) < midnight) {
            this.props.resetCount();
        }
    }

    render() {
        return (
            <Card style={styles.container} id={this.props.id}>
                <Card.Content>
                    <Title>My Habit</Title>
                    <Paragraph>{this.props.habit.count} / {this.props.habit.limit}</Paragraph>
                    <Paragraph>Last logged: {this.props.updatedDisplay}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button mode='contained' disabled={this.props.hasReachedLimit} onPress={this.incrementCount}>+</Button>
                    <Button mode='contained' onPress={this.showDialog}>Set Limit</Button>
                </Card.Actions>
                <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
                    <Dialog.Title>Choose a daily limit</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Daily limit"
                            onChangeText={(limit) => this.setTempLimit(limit)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={this.hideDialog}>Cancel</Button>
                        <Button onPress={this.setLimit}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Card >
        );
    }
};

function mapStateToProps(state, ownProps) {
    const habit = state.count.habits[ownProps.id];
    const lastIncrementLog = habit.log.filter((log) => { return log.info.type == 'increment' }).slice(-1);
    return {
        habit: habit,
        lastUpdated: habit ? lastIncrementLog.updated : null,
        updatedDisplay: lastIncrementLog ? (new Date(lastIncrementLog.updated)).toLocaleString() : 'Never',
        hasReachedLimit: habit ? hasReachedDailyLimitSelector(state.count, ownProps.id) : {},
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        incrementCount: () => dispatch(incrementCount((new Date()).valueOf()), ownProps.id),
        resetCount: () => dispatch(resetCount((new Date()).valueOf(), ownProps.id)),
        setLimit: (limit) => dispatch(setLimit((new Date()).valueOf(), limit, ownProps.id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogButton);