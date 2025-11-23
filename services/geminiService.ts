import { GoogleGenAI, Type } from "@google/genai";
import { Question, QuizConfig } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateQuizQuestions = async (config: QuizConfig): Promise<Question[]> => {
  const model = "gemini-2.5-flash"; // Using flash for speed and efficiency for MCQs

  const prompt = `Generate ${config.questionCount} multiple-choice questions (MCQs) for a Library and Information Science (LIS) test.
  Topic: ${config.topic}
  Difficulty Level: ${config.difficulty}
  
  The questions should be suitable for exams like UGC NET, SET, or Librarian recruitment exams.
  Ensure options are plausible and the explanation is educational.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: {
                type: Type.STRING,
                description: "The question text."
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "An array of 4 distinct options."
              },
              correctIndex: {
                type: Type.INTEGER,
                description: "The index (0-3) of the correct option."
              },
              explanation: {
                type: Type.STRING,
                description: "A brief explanation of why the answer is correct."
              }
            },
            required: ["text", "options", "correctIndex", "explanation"]
          }
        }
      }
    });

    if (!response.text) {
      throw new Error("No data received from Gemini");
    }

    const rawQuestions = JSON.parse(response.text);
    
    // Map to ensure IDs and structure
    return rawQuestions.map((q: any, index: number) => ({
      id: `q-${Date.now()}-${index}`,
      text: q.text,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation
    }));

  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};