import React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { withTheme, Button, TextInput, HelperText, Paragraph, Title } from 'react-native-paper';
//REDUX
import { connect } from 'react-redux';
//NAVIGATION
import { useRoute } from '@react-navigation/native';
//CHARTS
import { LineChart } from 'react-native-chart-kit';
import { getLastLabels, getUnixLimit, getDataForLabels } from '../dateUtils';


const styles = theme => StyleSheet.create({
    topText: {
        textAlign: 'center',
        paddingTop: 5,
        backgroundColor: '#FFFFFF',
        margin: 0
    }
});


function Report(props) {
    const route = useRoute();
    const habitId = route.params.habit;
    const width = Dimensions.get('window').width;
    const height = 220;

    const chartConfig =
    {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        decimalPlaces: 0,
    }

    const graphStyle = {
        ...chartConfig.style
    }

    //Get increment logs after limit
    const log = props.habits[habitId].log.filter(function (log) {
        return log.info.type == 'increment' && log.updated > getUnixLimit(7)
    });

    // Get labels - only show last 7 days for now
    // Want labels = [02/07, 03/07, 04/07] format
    const data = {
        labels: getLastLabels(7),
        datasets: [{
            data: getDataForLabels(log, 7),
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
        }]
    }
    return (
        <ScrollView>
            <Title style={styles(props.theme).topText}>{props.habits[habitId].title}</Title>
            <Paragraph style={styles(props.theme).topText}>Last 7 days</Paragraph>
            <LineChart
                data={data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
                withInnerLines={false}
            />
        </ScrollView>
    )
}

const mapStateToProps = (state) => ({
    habits: state.habits.habits,
})

export default withTheme(connect(mapStateToProps)(Report));