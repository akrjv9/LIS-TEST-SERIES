import { GoogleGenAI, Type } from "@google/genai";
import { Question, QuizConfig, StudyGuide } from "../types";
import { RANGANATHAN_SOURCE } from "../sourceData";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateStudyGuide = async (topic: string): Promise<StudyGuide> => {
  const model = "gemini-2.5-flash"; 
  
  // Explicitly prioritizing the user's wordpress site
  const searchQuery = `site:listestseries.wordpress.com ${topic} OR "${topic}" library science listestseries`;

  const prompt = `You are an expert Library and Information Science tutor representing 'LIST Test Series'. 
  Write a comprehensive study guide/summary about "${topic}".
  
  Structure the content with clear headings, bullet points, and concise paragraphs.
  Do not use Markdown '#', '##' styles for headers. Instead, use capitalized text or spacing to denote sections so it looks good in plain text.
  
  Focus on:
  - Key definitions
  - Important figures and authors
  - Critical years/dates
  - Relevance to LIS competitive exams (UGC NET/SET)
  
  Use the Google Search results to provide accurate information, prioritizing content from listestseries.wordpress.com if available.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType cannot be JSON when using Search tool
      }
    });

    if (!response.text) {
      throw new Error("No study material generated.");
    }

    // Extract sources from grounding metadata
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web)
      .filter((web: any) => web && web.uri && web.title) || [];

    return {
      topic,
      content: response.text,
      sources: sources
    };

  } catch (error) {
    console.error("Error generating study guide:", error);
    throw error;
  }
};

export const generateQuizQuestions = async (config: QuizConfig): Promise<Question[]> => {
  const model = "gemini-2.5-flash"; // Using flash for speed and efficiency for MCQs

  let prompt = `You are the AI engine for 'LIST Test Series' (listestseries.wordpress.com). 
  Generate ${config.questionCount} multiple-choice questions (MCQs) for a Library and Information Science (LIS) test.
  
  Topic: ${config.topic}
  Difficulty Level: ${config.difficulty}`;

  // Priority 1: User provided source text (from Study Guide)
  if (config.sourceText) {
    prompt += `\n\nCRITICAL INSTRUCTION: You must base the questions and explanations STRICTLY on the following source text. Do not use outside knowledge if it conflicts with this text.\n\n--- SOURCE TEXT START ---\n${config.sourceText}\n--- SOURCE TEXT END ---\n`;
  } 
  // Priority 2: Hardcoded Ranganathan Source
  else if (config.topic === 'Dr. S.R. Ranganathan') {
    prompt += `\n\nCRITICAL INSTRUCTION: You must base the questions and explanations STRICTLY on the following source text provided below. Do not use outside knowledge if it conflicts with this text. Focus on dates, specific book titles mentioned, life events, awards, and his philosophy as described here.\n\n--- SOURCE TEXT START ---\n${RANGANATHAN_SOURCE}\n--- SOURCE TEXT END ---\n`;
  } 
  // Priority 3: General Generation 
  else {
    prompt += `\n\nThe questions should be suitable for exams like UGC NET, SET, or Librarian recruitment exams.
    Style: Professional, academic, and aligned with the high standards of LIST Test Series.
    Focus on factual accuracy relevant to Library Science curriculum.
    If the topic is specific, try to cover key definitions, authors, years, and standard classifications.`;
  }
  
  prompt += `\nEnsure options are plausible and the explanation is educational.`;

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