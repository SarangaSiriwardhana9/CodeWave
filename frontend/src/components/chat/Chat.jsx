import React from 'react';
import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
// import '@zegocloud/zimkit-react/index.css';

// The following uses the App instance as an example.
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            appConfig: {
                appID: 651572645,      
                serverSecret: 'da4dea9112be6687e57e9f8dc0d069b6'
            },
            // The userID and userName is a strings of 1 to 32 characters.
            // Only digits, letters, and the following special characters are supported: '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'
            userInfo: {
                userID: '12345',
                userName: 'eshan',
                userAvatarUrl: 'https://www.upwork.com/mc/documents/colorschemeavatar.jpg'
            },
        }
    }
    async componentDidMount() {
        const zimKit = new ZIMKitManager();
        const token = zimKit.generateKitTokenForTest(this.state.appConfig.appID, this.state.appConfig.serverSecret, this.state.userInfo.userID);
        await zimKit.init(this.state.appConfig.appID);
        await zimKit.connectUser(this.state.userInfo, token);
    }
    render() {
        return (
            <Common></Common> 
        );
    }
}