import * as React from 'react';
import { GlobalSettingsContext } from './GlobalSettingsProvider';



export default function useGlobalSettings() {

    const globalSettings = React.useContext(GlobalSettingsContext)

    return globalSettings;
}