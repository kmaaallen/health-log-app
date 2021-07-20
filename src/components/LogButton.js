import React, { Component } from 'react';
import { Button, Paragraph } from 'react-native-paper';
//REDUX
import { connect } from 'react-redux';
import { incrementCount } from '../redux/actions';
import { hasReachedDailyLimitSelector } from '../redux/selectors';

export class LogButton extends Component {
    render() {
        return (
            <Button disabled={this.props.hasReachedLimit} onPress={this.props.incrementCount}>
                <Paragraph>My Habit</Paragraph>
                <Paragraph>{this.props.count}</Paragraph>
                <Paragraph>Last logged:{this.props.updated}</Paragraph>
            </Button>
        );
    }
};

const mapStateToProps = (state) => ({
    count: state.count.count,
    updated: state.count.updated
})

const mapActionsToProps = {
    incrementCount,
}

export default connect(mapStateToProps, mapActionsToProps)(LogButton);