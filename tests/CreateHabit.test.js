import React from 'react';
import renderer from 'react-test-renderer';

import { CreateHabit } from '../src/components/CreateHabit';

describe('<CreateHabit />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<CreateHabit />).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(<CreateHabit />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
