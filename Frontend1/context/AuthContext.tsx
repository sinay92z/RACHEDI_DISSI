import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface User {
  id: string;
  email: string;
  name: string;
  profilePictureUrl: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    token: null,
    user: null,
    loading: false,
    error: null,
  });

  const [initialized, setInitialized] = useState(false); // Nouvel état pour savoir si l'auth est prête

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const tokenString = await AsyncStorage.getItem("userToken");
        const userString = await AsyncStorage.getItem("userData");

        if (tokenString) {
          const token = tokenString;
          const user = userString ? JSON.parse(userString) : null;
          setState((prev) => ({ ...prev, token, user }));
        }
      } catch (error) {
        console.error("Erreur lors du chargement du token:", error);
      } finally {
        setInitialized(true); // Marquer comme initialisé après le chargement
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // Requête pour le login
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la connexion");
      }

      const data = await response.json();
      const token = data.access_token;

      if (!token) {
        throw new Error("Token non reçu");
      }

      // Récupération des informations utilisateur
      const getInfo = await fetch(`${API_URL}/users/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!getInfo.ok) {
        const errorInfo = await getInfo.json();
        throw new Error(
          errorInfo.message ||
            "Erreur lors de la récupération des informations utilisateur"
        );
      }

      const userData = await getInfo.json();

      // Stockage des données dans AsyncStorage
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      setState((prev) => ({
        ...prev,
        token,
        user: userData,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error ? error.message : "Une erreur est survenue",
      }));
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");
      setState({
        token: null,
        user: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // Bloquer le rendu tant que le chargement initial n'est pas terminé
  if (!initialized) {
    return null; // Affiche un écran de chargement si nécessaire
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
