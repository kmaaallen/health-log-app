import React, { useState, useLayoutEffect, useRef } from 'react';
import { Card, Paragraph } from 'react-native-paper';


const LogButton = () => {
    const [count, setCount] = useState(0);
    const [updated, setUpdated] = useState('never');

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        } else {
            var now = Date.now();
            var date = new Date(now);
            var dateTime = date.toLocaleString();
            setUpdated(dateTime);
        }
    }, [count])

    return (
        <Card onPress={() => { setCount(count + 1) }} style={{ height: 200, width: 200 }}>
            <Card.Title title="My Habit" />
            <Card.Content>
                <Paragraph>{count}</Paragraph>
                <Paragraph>Last logged: {updated}</Paragraph>
            </Card.Content>
        </Card>
    );
};

export default LogButton;