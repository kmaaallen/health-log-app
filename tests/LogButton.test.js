import React from 'react';
import renderer from 'react-test-renderer';

import { LogButton } from '../src/components/LogButton';


describe('<LogButton />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<LogButton />).toJSON();
        expect(tree.children.length).toBe(1);
    });
    it('renders correctly', () => {
        const tree = renderer.create(<LogButton />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
