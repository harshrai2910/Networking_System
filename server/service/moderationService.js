import cloudinary from "../config/cloudinary.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import userPost from "../model/userPost.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

export const moderateImage = async ({ postId, img, content, public_id }) => {
  console.time("AI");
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input: [
      {
        type: "text",
        text: `Moderate this student social app post.

                BLOCK images containing nudity, exposed intimate body parts,
                underwear, lingerie, bikinis, swimwear, shirtless people,
                sexual content, or highly revealing clothing.

                BLOCK text containing explicit sexual content, sexual harassment,
                threats, targeted abuse, hate speech, or scams.

                ALLOW normal conversations, fully clothed people, sports,
                fitness, educational content, and professional discussions.

                Evaluate image and text independently.
                BLOCK if either violates these rules.
                When uncertain, BLOCK.

                POST TEXT: ${content}

                Return ONLY valid JSON:
                {"flag":boolean,"action":"ALLOW"|"BLOCK","reason": (6-7 words)string|null}
              `,
      },
      {
        type: "image",
        data: img.buffer.toString("base64"),
        mime_type: img.mimetype,
      },
    ],
  });

  console.timeEnd("AI");

  // Safe Regex to extract only the JSON block (ignores extra markdown or text)
  const jsonMatch = interaction.output_text.match(/\{[\s\S]*\}/);

  const AI_response = JSON.parse(jsonMatch[0]);
  console.log(AI_response);

  if (AI_response.flag !== false || AI_response.action !== "ALLOW") {
    await cloudinary.uploader.destroy(public_id, { invalidate: true });
    await userPost.findByIdAndDelete(postId);
    return AI_response;
  }

  await userPost.findByIdAndUpdate(postId, { moderationStatus: "approved" });

  return AI_response;
};
