import { NavigationContainer } from '@react-navigation/native-stack';

import { AppRoutes } from './app.routes';

export function Routes() {
    return (
        <NavigationContainer>
            <AppRoutes/>
        </NavigationContainer>
    )
 }
