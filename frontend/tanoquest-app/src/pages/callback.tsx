'use client';
import { Navigate } from 'react-router-dom';
import { useSession } from '../SessionContext';
import { useEffect } from 'react';
import { supabase } from '../models/supabaseClient';
import type { Session } from '@toolpad/core/AppProvider';

export default function CallbackPage() {
  const { session,setSession } = useSession();

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
  
 
  if (session) {
    return <Navigate to="/" replace />;
  }else {
    return <div>Loading...</div>;
  }
}
