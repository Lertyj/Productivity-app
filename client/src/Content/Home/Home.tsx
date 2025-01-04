import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header";

interface User {
  name: string;
  avatar: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User>({ name: "", avatar: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://your-api.com/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser({ name: data.name, avatar: data.avatar });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Header name={user.name} avatar={user.avatar} />
    </div>
  );
};

export default App;
