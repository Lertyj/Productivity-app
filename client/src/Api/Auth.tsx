async function login(email: string, password: string): Promise<boolean> {
  const response = await fetch("http://localhost:4444/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return true;
  }

  return false;
}

async function register(email: string, password: string): Promise<boolean> {
  const response = await fetch("http://localhost:4444/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.ok;
}

async function resetPassword(
  email: string,
  newPassword: string,
  oldPassword: string
): Promise<boolean> {
  const response = await fetch("http://localhost:4444/auth/resetpassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword, oldPassword }),
  });

  return response.ok;
}

export { login, register, resetPassword };
