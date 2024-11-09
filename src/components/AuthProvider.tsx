import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { auth } from '../config/firebase';
import { setUser } from '../store/slices/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { supabase } from '../config/supabase';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Sync user with Supabase
        const { error } = await supabase
          .from('users')
          .upsert({
            id: user.uid,
            email: user.email,
            display_name: user.displayName,
            photo_url: user.photoURL,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'id'
          });

        if (error) {
          console.error('Error syncing user with Supabase:', error);
        }

        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}; 