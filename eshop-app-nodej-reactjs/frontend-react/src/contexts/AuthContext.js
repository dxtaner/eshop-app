import { createContext, useContext, useEffect, useState } from "react";
import { fetchLogout, fetchMe } from "../api";
import { Flex, Spinner, useToast } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const me = await fetchMe();
        setUser(me);
        setLoggedIn(true);
      } catch (error) {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (data) => {
    setLoggedIn(true);
    setUser(data.user);
    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token", data.refreshToken);

    toast({
      title: `Welcome, ${data.user.email}!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const logout = async (callback) => {
    setLoggedIn(false);
    setUser(null);

    try {
      await fetchLogout();
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      toast({
        title: "Logout successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }

    callback();
  };

  const authContextValue = {
    user,
    loggedIn,
    login,
    logout,
  };

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          size="xl"
          color="red.700"
        />
      </Flex>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
