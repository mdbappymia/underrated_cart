import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

const useAuthData = () => {
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    gender: "All",
    brands: ["Puma", "Nike", "Supreme"],
    colors: ["Black", "Yellow", "Green"],
    minPrice: 16,
    maxPrice: 543,
  });

  const handleLogin = async (email: string, password: string) => {
    if (typeof email === "string" && typeof password === "string") {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        setUser(data);
        if (data.accessToken) {
          await SecureStore.setItemAsync("accessToken", data.accessToken);
        }
        if (data.refreshToken) {
          await SecureStore.setItemAsync("refreshToken", data.refreshToken);
        }

        router.push("/");
      } catch (error) {
        alert("Login failed. Please check your credentials and try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const refreshAuthToken = async () => {
    try {
      const storedRefreshToken = await SecureStore.getItemAsync("refreshToken");
      if (!storedRefreshToken) {
        console.log("No refresh token available. User needs to log in again.");
        return null;
      }
      const response = await fetch("https://dummyjson.com/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: storedRefreshToken,
          expiresInMins: 30,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to refresh token");
      }

      if (data.accessToken) {
        await SecureStore.setItemAsync("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);
      }

      console.log("Tokens refreshed successfully:", data);
      return data.accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      setUser({});
      router.replace("/starter");
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        const refreshToken = await SecureStore.getItemAsync("refreshToken");

        if (!token && !refreshToken) {
          console.log("No access token or refresh token found in SecureStore");
          return;
        } else if (!token && refreshToken) {
          console.log(
            "Access token missing, attempting to refresh using refresh token",
          );
          const newAccessToken = await refreshAuthToken();
          if (!newAccessToken) {
            console.log(
              "Failed to refresh access token. User needs to log in again.",
            );
            return;
          }
        }

        const validToken =
          token || (await SecureStore.getItemAsync("accessToken"));

        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${validToken}`,
          },
        });

        const data = await response.json();
        if (data && data.id) {
          setUser(data);
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { user, handleLogin, loading, handleLogout, filter, setFilter };
};

export default useAuthData;
