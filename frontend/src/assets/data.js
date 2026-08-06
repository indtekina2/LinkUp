import { getProtectedData, sendProtectedPost } from "../utils/API";

// getting current user data from backend
async function getCurrentUserData() {
  try {
    const data = await getProtectedData(
      "api/current-user",
    );
    if (data.success) {
      // console.log("Current user data:", data.user);
      return data.user;
    } else {
      console.error("Failed to fetch current user data:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching current user data:", error);
    return null;
  }
}

// getting all users data from backend
async function getAllUsers(ids) {
  try {
    const data = await sendProtectedPost("api/users", {
      ids,
    });
    if (data.success) {
      return data.users;
    } else {
      console.error("Failed to fetch all users data:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching all users data:", error);
    return null;
  }
}

// getting all conversations data from backend
async function getConversation(convoId) {
  try {
    const data = await sendProtectedPost(
      "api/conversations",
      { convoId },
    );
    if (data.success) {
      return data.data;
    } else {
      console.error("Failed to fetch all conversations data:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching all conversations data:", error);
    return null;
  }
}

export { getAllUsers, getConversation, getCurrentUserData };
