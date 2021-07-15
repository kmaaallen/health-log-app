import React, { Component } from 'react';
import { Card, Paragraph } from 'react-native-paper';
//REDUX
import { connect } from 'react-redux';
import { incrementCount } from '../redux/actions';

export class LogButton extends Component {
    render() {
        return (
            <Card onPress={this.props.incrementCount} style={{ height: 200, width: 200 }}>
                <Card.Title title="My Habit" />
                <Card.Content>
                    <Paragraph>{this.props.count}</Paragraph>
                    <Paragraph>Last logged: {this.props.updated}</Paragraph>
                </Card.Content>
            </Card>
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