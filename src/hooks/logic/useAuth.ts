import { useLocalStorage } from "usehooks-ts";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>(
    "isAuthenticated",
    false
  );

  const login = (username: string, password: string) => {
    const HARD_CODED_USERNAME = "admin";
    const HARD_CODED_PASSWORD = "password123";

    if (username === HARD_CODED_USERNAME && password === HARD_CODED_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
