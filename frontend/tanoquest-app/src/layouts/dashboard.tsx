import { Outlet, Navigate, useLocation } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { useSession } from '../SessionContext';
import { useEffect } from 'react';
import { supabase } from '../models/supabaseClient';
import type { Session } from '@toolpad/core/AppProvider';

export default function Layout() {
    const { session,setSession } = useSession();
    const location = useLocation();

    const enabledSession = true;

 useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const newSession: Session = {
          user: {
            name: session.user.user_metadata.full_name || '',
            email: session.user.email || '',
            image: session.user.user_metadata.avatar_url || '',
            id: session.user.id || '',
          },
        };
        setSession(newSession);
      }
      else{
        setSession(null);
      }
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const newSession: Session = {
          user: {
            name: session.user.user_metadata.full_name || '',
            email: session.user.email || '',
            image: session.user.user_metadata.avatar_url || '',
            id: session.user.id || '',
          },
        };
        setSession(newSession);
      }
      else{
        setSession(null);
      }
    });

    getSession(); 
    return () => {
      subscription?.unsubscribe();
    };
  },[setSession]);




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