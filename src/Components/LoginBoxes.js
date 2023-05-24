import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../supabase";

export default function LoginPage() {
  return (
    <div className="login">
      <Auth
        supabaseClient={supabase}
        providers={[]}
        showLinks={false}
        appearance={{
          extend: false,
          className: {
            anchor: "login-anchor",
            button: "login-button",
            label: "login-label",
            input: "login-input",
            message: "login-message"
          }
        }}
      />
    </div>
  );
}
