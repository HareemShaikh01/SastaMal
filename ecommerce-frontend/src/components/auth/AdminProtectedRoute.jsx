"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role === "Admin") {
        setAuthorized(true);
      } else {
        router.push("/unauthorized");
      }
    } catch (err) {
      console.error("Token decode error", err);
      router.push("/login");
    }
  }, [router]);

  if (!authorized) return null; // or a spinner

  return children;
};

export default AdminProtectedRoute;
