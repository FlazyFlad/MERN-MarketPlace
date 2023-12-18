import React, { useContext, useEffect } from 'react';
import { Modal, Textarea, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../Context';

const AuthModal = () => {
    const { theme } = useContext(ThemeContext);
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate();
    const authError = useSelector((state) => state.auth.error);

    useEffect(() => {
        if (authError && authError?.response?.status == 401) {
            navigate('/login');
        }
    }, [authError]);

    const redirectToLogin = () => {
        setShowModal(false)
        navigate('/login');
    };

    return (
        <>
            {/* Your other component code */}

            {showModal && (
                <div className={`${theme ? "dark-section " : "light-section"}`} style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '15'
                }}>
                    <div className={`${theme ? "dark-section " : "light-section"}`} style={{
                        padding: '1em',
                        borderRadius: '8px',
                    }}>
                        <h2>Authentication Error</h2>
                        <p>You need to login to continue.</p>
                        <button onClick={redirectToLogin}>Go to Login</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AuthModal;
