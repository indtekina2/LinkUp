// sending and getting data from backend using fetch API
async function sendPost(api, information) {
  const response = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(information),
  });

  const data = await response.json();
  return data;
}

// getting data from backend using fetch API
async function getData(api) {
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

// request protected data from backend using fetch API
async function getProtectedData(api) {
  const token = localStorage.getItem("token");

  const response = await fetch(api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

// sending protected data to backend using fetch API
async function sendProtectedPost(api, information) {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found. User might not be authenticated.");
    window.location.href = "/login/login"; // Redirect to login page
  }

  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(information),
    });

    const data = await response.json();
    console.log(data);
    if (!data.success) {
      alert(data.message);
    }
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw to be caught by the caller
  }
}

async function isAuthenticated(token) {
  if (token) {
    const response = await getProtectedData(
      "http://localhost:3000/api/protected",
    );
    return response.success;
  }
  return false;
}

export {
  sendPost,
  getData,
  getProtectedData,
  isAuthenticated,
  sendProtectedPost,
};