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

export { sendPost }
