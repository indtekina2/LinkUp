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

export { sendPost, getData, getProtectedData };