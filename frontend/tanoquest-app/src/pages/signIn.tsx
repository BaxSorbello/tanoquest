'use client';
import { SignInPage } from '@toolpad/core/SignInPage';
import { supabase } from '../models/supabaseClient';

export default function SignIn() {

  return (
    <SignInPage
      providers={[{ id: 'github', name: 'GitHub' }]}
      signIn={async (_, __, callbackUrl) => {
      try{
        const signInResponse = await supabase.auth.signInWithOAuth({
                                provider: 'github',
                                options: {
                                  redirectTo: callbackUrl,
                                },
                          });
        if (signInResponse.error) {
          return {error:signInResponse.error.message};
        } 
        return {};
      }
      catch (error) {
          return { error: error instanceof Error ? error.message : 'An error occurred' };
        }}}
    />
  );
}
