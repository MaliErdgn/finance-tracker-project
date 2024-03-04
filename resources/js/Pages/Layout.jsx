import React from 'react';
import NavBar from '@/Components/NavBar';
const Layout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <main>{children}</main>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </div>
    );
};

export default Layout;
