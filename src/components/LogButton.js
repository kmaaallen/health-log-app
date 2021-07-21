import React, { Component } from 'react';
import { Button, Paragraph, Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';
//REDUX
import { connect } from 'react-redux';
import { incrementCount } from '../redux/actions';
import { hasReachedDailyLimitSelector } from '../redux/selectors';

const styles = StyleSheet.create({
    habitButton: {
        padding: 20,
    },
    habitButtonText: {
        display: 'block',
        textAlign: 'center',
        fontSize: '15px',
        padding: 10
    },
    habitCount: {
        display: 'block',
        textAlign: 'center',
        fontSize: '30px'
    }
});

export class LogButton extends Component {
    render() {
        return (
            <Button style={styles.habitButton} disabled={this.props.hasReachedLimit} onPress={this.props.incrementCount}>
                <Title style={styles.habitButtonText}>My Habit</Title>
                <Paragraph style={styles.habitCount}>{this.props.count}</Paragraph>
                <Paragraph style={styles.habitButtonText}>Last logged: {this.props.updated}</Paragraph>
            </Button>
        );
    }
};

const mapStateToProps = (state) => ({
    count: state.count.count,
    updated: state.count.updated ? (new Date(state.count.updated)).toLocaleString() : 'Never',
    hasReachedLimit: hasReachedDailyLimitSelector(state)
})

const mapActionsToProps = {
    incrementCount,
}

export default connect(mapStateToProps, mapActionsToProps)(LogButton);