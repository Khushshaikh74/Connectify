import { StreamChat } from 'stream-chat'; // ✅ Correct import
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const secretKey = process.env.STREAM_SECRET_KEY;

if (!apiKey || !secretKey) {
    console.error("Stream API key or secret key is missing");
    process.exit(1); // ✅ Properly terminate the process
}

const streamClient = StreamChat.getInstance(apiKey, secretKey);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData); // ✅ Accepts a single object
    } catch (error) {
        console.error("Error upserting Stream user:", error.message);
    }
};

export const generateStreamToken = (userId) => {
  try {
    // ensure userId is a string
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};
