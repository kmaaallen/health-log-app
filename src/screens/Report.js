import React, { useState } from 'react';
import { StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import { withTheme, Button, TextInput, HelperText, Paragraph, Title, IconButton } from 'react-native-paper';
//REDUX
import { connect } from 'react-redux';
//NAVIGATION
import { useRoute } from '@react-navigation/native';
//CHARTS
import { LineChart } from 'react-native-chart-kit';
import { getLastLabels, getFirstEntryLimit, getDataForLabels, getYearHelper } from '../dateUtils';


const styles = theme => StyleSheet.create({
    topText: {
        textAlign: 'center',
        paddingTop: 5,
        backgroundColor: '#FFFFFF',
        margin: 0,
    },
    fullRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    }
});

function Report(props) {
    const route = useRoute();
    const habitId = route.params.habit;
    const width = Dimensions.get('window').width;
    const height = 220;
    // Data constants
    const habitFrequency = props.habits[habitId].frequency == 'Daily' ? 7 : props.habits[habitId].frequency == 'Weekly' ? 4 : 12;
    const filteredLog = props.habits[habitId].log.filter(function (log) {
        return log.info.type == 'increment';
    });
    const earliestDataLimit = getFirstEntryLimit(filteredLog[0].updated, habitFrequency); // determined first chunk of data
    // Data changeable
    const [chartLimit, setChartLimit] = useState(habitFrequency); // Determines which chunk of data to show
    const [chartData, setChartData] = useState(
        {
            labels: getLastLabels(chartLimit, habitFrequency),
            datasets: [{
                data: getDataForLabels(filteredLog, chartLimit, habitFrequency),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
            },
            /*{
                data: [0], //lowest graph value to fix y-axis values for low data sets - still being weird.
                withDots: false, //hide the lowest dot.
            }*/,]
        }
    ); // sets data for chart based on chunk

    const chartConfig =
    {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        //decimalPlaces: 0,
    }

    const graphStyle = {
        ...chartConfig.style
    }

    const getData = (direction) => {
        let newLimit;
        // if direction left - go back {frequency} days,
        // if direction right - go forward {frequency} days
        if (direction == 'left') {
            newLimit = chartLimit + habitFrequency;
        } else {
            newLimit = chartLimit - habitFrequency;
        }

        setChartData({
            labels: getLastLabels(newLimit, habitFrequency),
            datasets: [{
                data: getDataForLabels(filteredLog, newLimit, habitFrequency),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
            },
            /*{
                data: [4], //lowest graph value to fix y-axis values for low data sets
                withDots: false, //hide the lowest dot.
            }*/]
        });

        setChartLimit(newLimit);
    }
    return (
        <ScrollView>
            <Title style={styles(props.theme).topText}>{props.habits[habitId].title}</Title>

            <View style={styles.apply(props.theme).fullRow}>
                <IconButton
                    icon="arrow-left-bold-circle"
                    size={20}
                    onPress={() => getData('left')}
                    disabled={earliestDataLimit == chartLimit}
                />
                <Paragraph>
                    {props.habits[habitId].frequency == 'Monthly' ? getYearHelper(chartLimit) : `${chartData.labels[0]} - ${chartData.labels[habitFrequency - 1]}`}</Paragraph>
                <IconButton
                    icon="arrow-right-bold-circle"
                    size={20}
                    onPress={() => getData('right')}
                    disabled={chartLimit == habitFrequency}
                />
            </View>
            <LineChart
                data={chartData}
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