import { proxy } from "valtio";
import { type User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
}

const authState = proxy<AuthState>({
  user: null,
});

export default authState;
