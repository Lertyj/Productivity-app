import React from "react";
import { useAuth } from "../../Context/AuthContext";
function Home() {
  const { logout } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div>
      <button onClick={logout}>lol</button>
    </div>
  );
}

export default Home;
