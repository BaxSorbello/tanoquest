import * as React from 'react';
import RepartitionIcon from '@mui/icons-material/Repartition';
import { Outlet, useNavigate } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation,Session} from '@toolpad/core/AppProvider';
import { SessionContext } from './SessionContext';
import { supabase } from './models/supabaseClient';


const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Configuration',
    },
    {
        segment: 'classes',
        title: 'Classes',
        icon: <RepartitionIcon />,
    },
];

const BRANDING = {
    title: 'TanoQuest App',
    logo: <img src="./vite.svg" alt="TanoQuest logo" />,
};



export default function App() {
    const [session, setSession] = React.useState<Session | null>(null);
    const navigate = useNavigate();

    const signIn = React.useCallback(() => {
        navigate('/sign-in');
    }, [navigate]);

    const signOut = React.useCallback(() => {
        supabase.auth.signOut().then(() => {
            setSession(null);
        navigate('/sign-in');});
    }, [navigate]);

    const sessionContextValue = React.useMemo(() => ({ session, setSession }), [session, setSession]);

    return (
        <SessionContext.Provider value={sessionContextValue}>
            <ReactRouterAppProvider
                navigation={NAVIGATION}
                branding={BRANDING}
                session={session}
                authentication={{ signIn, signOut }}
            >
                <Outlet />
            </ReactRouterAppProvider>
        </SessionContext.Provider>
    );
}
