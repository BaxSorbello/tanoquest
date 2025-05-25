import { Outlet, Navigate, useLocation } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { useSession } from '../SessionContext';

export default function Layout() {
    const { session } = useSession();
    const location = useLocation();

    const enabledSession = true;

    if (enabledSession && !session) {
        // Add the `callbackUrl` search parameter
        const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;

        return <Navigate to={redirectTo} replace />;
    }

    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
}