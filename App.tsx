import { Provider } from 'react-redux';

import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/redux/store';
import { ThemeProvider } from './src/context/ThemeContext';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <RootNavigator />
            </ThemeProvider>
        </Provider>
    );
}

export default App;