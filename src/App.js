import "./styles.css";
import LoginPage from "./LoginPage.js";
import { useState, useEffect } from "react";
import HomePage from "./Home/HomePage";
import { supabase } from "./supabase";
import Home from "./Home/components/Home";
import CheckProfile from "./CheckProfile";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.data.subscription.unsubscribe();
  }, [setSession]);

  return (
    <div>{session ? <CheckProfile userID={session.user.id} /> : <LoginPage />}</div>
  );
}
