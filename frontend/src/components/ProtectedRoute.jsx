import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { JWT_TOKEN } from '../constants';

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const auth = async () => {
        try {
            const storedToken = localStorage.getItem(JWT_TOKEN);
            console.log("Retrieved token:", storedToken);

            if (!storedToken) {
                setIsAuthorized(false);
                return;
            }

            const decodedToken = jwtDecode(storedToken);
            console.log("Decoded token:", decodedToken);
            
            const tokenExpiration = decodedToken.exp;
            const now = Date.now() / 1000;
            const isExpired = tokenExpiration < now;
            console.log("Token has expired:", isExpired);

            if (!isExpired) {
                setIsAuthorized(true);
                console.log("Is authorized:", isAuthorized);
            } else {
                localStorage.removeItem(JWT_TOKEN);
                console.warn('Token expired. Please log in again.');
            }
        } catch (error) {
            console.error("Auth error:", error);
            setIsAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />; // Render protected content if authorized

}
export default ProtectedRoute;
