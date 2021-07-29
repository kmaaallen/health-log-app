import React, { Component } from 'react';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { StyleSheet } from 'react-native';
//REDUX
import { connect } from 'react-redux';
import { incrementCount } from '../redux/actions';
import { hasReachedDailyLimitSelector } from '../redux/selectors';

const styles = StyleSheet.create({
    container: {
        height: 150,
    }
});

export class LogButton extends Component {
    render() {
        return (
            <Card style={styles.container}>
                <Card.Content>
                    <Title>My Habit</Title>
                    <Paragraph>{this.props.count}</Paragraph>
                    <Paragraph>Last logged: {this.props.updated}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button mode='contained' disabled={this.props.hasReachedLimit} onPress={this.props.incrementCount} icon="plus"></Button>
                </Card.Actions>
            </Card>
        );
    }
};

const mapStateToProps = (state) => ({
    count: state.count.count,
    updated: state.count.updated ? (new Date(state.count.updated)).toLocaleString() : 'Never',
    hasReachedLimit: hasReachedDailyLimitSelector(state)
})
/*
const mapActionsToProps = {
    incrementCount,
}*/
const mapDispatchToProps = (dispatch) => {
    return {
        incrementCount: () => dispatch(incrementCount((new Date()).valueOf())),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogButton);