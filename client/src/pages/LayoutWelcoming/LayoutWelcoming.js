import React, { useEffect } from 'react';

import openSocket from 'socket.io-client';

import TestTest from '../../components/TestTest/TestTest';

let socket;
const LayoutWelcoming = props => {

    useEffect(() => {
        socket = openSocket('http://localhost:8080/');
    });

    const sendMsgHandler = () => {
        socket.emit('hi_server');
    };

    return (
        <div>
            This is the welcoming page
            <button onClick={sendMsgHandler}>Send message to server</button>
            <TestTest />
        </div>
    );
};

export default LayoutWelcoming;