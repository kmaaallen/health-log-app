import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import { theme } from '../App';
import { ThemeProvider } from 'react-native-paper';


jest.mock('redux-persist/integration/react', () => ({
    PersistGate: props => props.children,
}));

jest.mock('react-native-paper/lib/commonjs/core/Provider', () => 'PaperProvider');

describe('<App />', () => {

    it('has 1 child', () => {
        const tree = renderer.create(<ThemeProvider theme={theme}><App /></ThemeProvider>).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(<ThemeProvider theme={theme}><App /></ThemeProvider>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});