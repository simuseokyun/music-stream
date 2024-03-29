import React from 'react';
import { useQuery } from 'react-query';
import { Header } from './components/header';
import { Outlet } from 'react-router-dom';

function Root() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Root;
