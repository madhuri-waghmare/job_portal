import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Logout = () => {
const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('userRole', '');
        navigate('/login');

    }, []);

    const Logout = () => (
        <main>
            <section class="hero">
                <h1>Logout Successful</h1>
            </section>
        </main>
    );
}
export default Logout;