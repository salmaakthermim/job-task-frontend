import React from 'react';
import Navbar from '../components/Nabvar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import App from '../App';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            {/* <App></App> */}
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;