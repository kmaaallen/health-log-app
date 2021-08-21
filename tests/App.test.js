import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

jest.mock('redux-persist/integration/react', () => ({
    PersistGate: props => props.children,
}));

jest.mock('react-native-paper/lib/commonjs/core/Provider', () => 'PaperProvider');

describe('<App />', () => {

    it('has 1 child', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});