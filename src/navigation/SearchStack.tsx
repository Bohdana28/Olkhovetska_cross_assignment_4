import {
    createNativeStackNavigator,
} from '@react-navigation/native-stack';

import SearchScreen from '../screens/SearchScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import SearchFilterScreen from '../screens/SearchFilterScreen';

import { SCREENS } from '../constants/screens';

import type {
    SearchStackParamList,
} from './types';

const Stack =
    createNativeStackNavigator<SearchStackParamList>();

export default function SearchStack() {
    return (
        <Stack.Navigator
            initialRouteName={
                SCREENS.SEARCH
            }
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name={SCREENS.SEARCH}
                component={SearchScreen}
            />

            <Stack.Screen
                name={SCREENS.SEARCH_RESULTS}
                component={
                    SearchResultsScreen
                }
            />

            <Stack.Screen
                name={SCREENS.SEARCH_FILTER}
                component={
                    SearchFilterScreen
                }
            />
        </Stack.Navigator>
    );
}