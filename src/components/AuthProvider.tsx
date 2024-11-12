import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { setUser } from '../store/slices/authSlice';
import { loadUserCart, clearCart } from '../store/slices/cartSlice';
import { supabase } from '../config/supabase';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        dispatch(setUser({
          uid: session.user.id,
          email: session.user.email || null,
          displayName: session.user.user_metadata?.display_name || null,
          photoURL: session.user.user_metadata?.photo_url || null,
        }));
        dispatch(loadUserCart(session.user.id));
      } else {
        dispatch(setUser(null));
        dispatch(clearCart());
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch(setUser({
          uid: session.user.id,
          email: session.user.email || null,
          displayName: session.user.user_metadata?.display_name || null,
          photoURL: session.user.user_metadata?.photo_url || null,
        }));
        dispatch(loadUserCart(session.user.id));
      } else {
        dispatch(setUser(null));
        dispatch(clearCart());
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}; 