export interface User {
    email: string;
    id: string;
  }
  
  export interface AuthState {
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
  }