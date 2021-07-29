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
        this.showDialog = this.showDialog.bind(this);
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
            <Card style={styles.container}>
                <Card.Content>
                    <Title>My Habit</Title>
                    <Paragraph>{this.props.count} / {this.props.limit}</Paragraph>
                    <Paragraph>Last logged: {this.props.updatedDisplay}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button mode='contained' disabled={this.props.hasReachedLimit} onPress={this.props.incrementCount}>+</Button>
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

const mapStateToProps = (state) => ({
    count: state.count.count,
    updated: state.count.updated,
    updatedDisplay: state.count.updated ? (new Date(state.count.updated)).toLocaleString() : 'Never',
    hasReachedLimit: hasReachedDailyLimitSelector(state),
    limit: state.count.limit
})

const mapDispatchToProps = (dispatch) => {
    return {
        incrementCount: () => dispatch(incrementCount((new Date()).valueOf())),
        resetCount: () => dispatch(resetCount()),
        setLimit: (limit) => dispatch(setLimit(limit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogButton);