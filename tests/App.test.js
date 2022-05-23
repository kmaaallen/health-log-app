import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import { theme } from '../App';
import { Provider as PaperProvider } from 'react-native-paper';

jest.mock('redux-persist/integration/react', () => ({
    PersistGate: props => props.children,
}));

describe('<App />', () => {

    it('has 1 child', () => {
        const tree = renderer.create(<PaperProvider theme={theme}><App /></PaperProvider>).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(<PaperProvider theme={theme}><App /></PaperProvider>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});