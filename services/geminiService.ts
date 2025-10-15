
import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from '../utils/fileUtils';

// Fix: Per coding guidelines, API key must be retrieved from process.env.API_KEY. This also resolves the TypeScript error on import.meta.env.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  // This error will be shown in the browser's console if the variable is not set correctly.
  throw new Error("API_KEY is not defined. Please check your environment variables.");
}
const ai = new GoogleGenAI({ apiKey });

interface ReunionPhotoParams {
  oldPhoto: File;
  newPhoto: File;
  style: string;
}

export const generateReunionPhoto = async ({
  oldPhoto,
  newPhoto,
  style,
}: ReunionPhotoParams): Promise<string> => {
  try {
    const oldPhotoBase64 = await fileToBase64(oldPhoto);
    const newPhotoBase64 = await fileToBase64(newPhoto);

    let prompt: string;

    if (style === 'Mirror Reflection') {
      prompt = `Generate one realistic photograph showing exactly two people only:

1️⃣ The adult version of the same person standing in front of a mirror, looking toward it.  
2️⃣ In the mirror reflection, show their younger (childhood) self.

Rules for composition and realism:
- The mirror must behave physically correct — show only the reflection, not a second duplicate standing in the room.  
- The reflection (child) appears **inside the mirror** only, matching real optical behavior.  
- The adult appears **outside the mirror**, partially facing it or in profile view.  
- Do not generate any third person or background duplicate.

Lighting and geometry:
- Keep light direction consistent between the real subject and the reflection.  
- The mirror surface shows correct reflection angle (use true optical perspective).  
- Add subtle mirror glare or rim-light for realism.  
- The reflection may have a soft blur or glass tint to distinguish it.

Environment and framing:
- Use a single mirror, waist-up or full-body composition.  
- Background simple and softly lit (bedroom, hall, or studio).  
- Both faces must match identity and emotion, with natural human expressions.  
- No ghosting, no second adult behind the mirror.

Visual tone:
- Photorealistic, cinematic lighting.  
- Natural reflections, proper symmetry.  
- Emotionally warm scene showing connection across time.`;
    } else {
        prompt = `Create a hyper-realistic reunion photo by seamlessly blending these two images of the same person at different ages. The younger version is in the first image, and the older version is in the second. The desired style is '${style}'. They should be interacting naturally, matching the style description. Harmonize their facial expressions and the overall lighting to create a cohesive and emotionally resonant image. The background should be replaced with a neutral, soft-focus background that complements the subjects.`;
    }
    
    // Fix: Completed the function to call the Gemini API and return the generated image. This resolves the "must return a value" error.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Per docs, "nano banana" maps to this model
      contents: {
        parts: [
          {
            inlineData: {
              data: oldPhotoBase64,
              mimeType: oldPhoto.type,
            },
          },
          {
            inlineData: {
              data: newPhotoBase64,
              mimeType: newPhoto.type,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        return `data:${mimeType};base64,${base64ImageBytes}`;
      }
    }

    throw new Error("Image generation failed: No image data received from API.");
  } catch (error) {
    console.error("Error generating reunion photo:", error);
    if (error instanceof Error && (error.message.includes("quota") || error.message.includes("rate limit"))) {
      throw new Error("Sorry, we're experiencing high demand right now. Please try again in a few moments.");
    }
    throw new Error("An unexpected error occurred. Please try again.");
  }
};
