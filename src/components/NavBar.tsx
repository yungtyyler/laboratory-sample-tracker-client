"use client";

import { useAuth } from "@/context/AuthContext";

function NavBar() {
  const { user, token, logout, loading } = useAuth();

  return <div>NavBar</div>;
}

export default NavBar;
