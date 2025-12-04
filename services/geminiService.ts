import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWallpaper = async (
  promptBase: string,
  color1: string,
  color2: string,
  isVariation: boolean = false
): Promise<string> => {
  try {
    // simplified prompt to avoid conflicting with config
    let finalPrompt = `${promptBase} Color palette: ${color1} and ${color2}. Cinematic lighting, 8k resolution.`;

    if (isVariation) {
      finalPrompt += " Create a distinctively different composition, alternate angle, unique layout, fresh perspective.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: finalPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16",
        },
      },
    });

    const candidate = response.candidates?.[0];

    if (!candidate) {
      throw new Error("No candidates returned from Gemini API.");
    }

    // Check for inline image data
    for (const part of candidate.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    // Check if the model returned text (e.g. refusal or chat) instead of an image
    const textPart = candidate.content?.parts?.find((p) => p.text);
    if (textPart?.text) {
      throw new Error(`Gemini returned text instead of image: "${textPart.text}"`);
    }

    // Check for finishReason (e.g. SAFETY)
    if (candidate.finishReason && candidate.finishReason !== "STOP") {
      throw new Error(`Generation stopped with reason: ${candidate.finishReason}`);
    }

    throw new Error("No image data found in response.");
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};