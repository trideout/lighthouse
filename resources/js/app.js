import React from "react";
import {render} from 'react-dom';
import Main from "./components/Main";

require('./bootstrap');
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const App = () => (
    <Main/>
);

render(<App/>, document.getElementById('app'));