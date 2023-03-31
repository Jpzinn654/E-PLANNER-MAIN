import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './src/Navigation/StackNavigation';
import DrawerNavigator from './src/Navigation/DrawerNavigator';

export default function App() {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
}
