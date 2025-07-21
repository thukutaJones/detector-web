"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  user: {
    role: string;
    id: string;
  }
  token: string;
}

export const useAuth = (
  allowedRoles: string[] = [],
  redirectPath = "/sign-in"
) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") router.push(redirectPath);

    const token = localStorage.getItem("token");

    if (!token) {
      router.push(redirectPath);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.user.role)) {
        router.push(redirectPath);
        return;
      }

      setUser({ ...decoded, token });
    } catch (error) {
      localStorage.removeItem("token");
      router.push(redirectPath);
    }
  }, []);

  return user;
};