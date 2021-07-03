import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Providers from './providers';

test('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Providers>
            <App />
        </Providers>, div);
    ReactDOM.unmountComponentAtNode(div);
});