// import { GoogleGenerativeAI } from "@google/generative-ai";

// let client = null;

// const getClient = () => {
//   if (!process.env.GEMINI_API_KEY) {
//     const err = new Error("GEMINI_API_KEY is not configured on the server.");
//     err.statusCode = 503;
//     err.publicMessage =
//       "Resume analysis is not available right now. The server is missing an AI API key.";
//     throw err;
//   }
//   if (!client) {
//     client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//   }
//   return client;
// };

// const ANALYSIS_PROMPT = (resumeText, jobDescription) => `
// You are an ATS (Applicant Tracking System) and resume analysis engine. Compare the resume below
// against the job description and return ONLY a valid JSON object — no markdown fences, no commentary,
// no leading or trailing text. The JSON must follow exactly this shape:

// {
//   "atsScore": <integer 0-100>,
//   "matchingSkills": [<string>, ...],
//   "missingSkills": [<string>, ...],
//   "strengths": [<string>, ...],
//   "suggestions": [<string>, ...],
//   "keywordAnalysis": [{ "keyword": <string>, "present": <boolean> }, ...]
// }

// Rules:
// - atsScore reflects how well the resume matches the job description overall.
// - matchingSkills: skills/technologies present in both the resume and the job description.
// - missingSkills: important skills from the job description that are absent from the resume.
// - strengths: 3-5 short, concrete points about what the resume does well for this role.
// - suggestions: 4-6 short, specific, actionable resume improvements. No generic filler.
// - keywordAnalysis: 8-12 relevant keywords from the job description, each marked present true/false
//   based on whether it appears in the resume.
// - Be concise and practical. Do not include any text outside the JSON object.

// RESUME:
// """
// ${resumeText}
// """

// JOB DESCRIPTION:
// """
// ${jobDescription}
// """
// `;

// const extractJson = (rawText) => {
//   const cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
//   const start = cleaned.indexOf("{");
//   const end = cleaned.lastIndexOf("}");
//   if (start === -1 || end === -1) {
//     throw new Error("AI response did not contain valid JSON.");
//   }
//   return JSON.parse(cleaned.slice(start, end + 1));
// };

// export const analyzeResume = async (resumeText, jobDescription) => {
//   const genAI = getClient();
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//   const result = await model.generateContent(ANALYSIS_PROMPT(resumeText, jobDescription));
//   const rawText = result.response.text();

//   try {
//     const parsed = extractJson(rawText);
//     return {
//       atsScore: Math.max(0, Math.min(100, Number(parsed.atsScore) || 0)),
//       matchingSkills: Array.isArray(parsed.matchingSkills) ? parsed.matchingSkills : [],
//       missingSkills: Array.isArray(parsed.missingSkills) ? parsed.missingSkills : [],
//       strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
//       suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
//       keywordAnalysis: Array.isArray(parsed.keywordAnalysis) ? parsed.keywordAnalysis : [],
//     };
//   } catch (err) {
//     const parseErr = new Error("Failed to parse AI analysis response.");
//     parseErr.statusCode = 502;
//     parseErr.publicMessage = "The AI analysis could not be processed. Please try again.";
//     throw parseErr;
//   }
// };


import { GoogleGenAI } from "@google/genai";

let client = null;

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    const err = new Error("GEMINI_API_KEY is not configured on the server.");
    err.statusCode = 503;
    err.publicMessage =
      "Resume analysis is not available right now. The server is missing an AI API key.";
    throw err;
  }

  if (!client) {
    client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return client;
};

const ANALYSIS_PROMPT = (resumeText, jobDescription) => `
You are an ATS (Applicant Tracking System) and resume analysis engine.

Compare the resume below against the job description and return a structured JSON
object containing an ATS compatibility analysis.

Rules:

- atsScore: integer from 0 to 100 representing the overall match.
- matchingSkills: skills/technologies present in both the resume and job description.
- missingSkills: important skills from the job description that are absent from the resume.
- strengths: 3-5 short, concrete points about what the resume does well for this role.
- suggestions: 4-6 short, specific, actionable resume improvements.
- keywordAnalysis: 8-12 relevant keywords from the job description, each marked
  present true/false based on whether the keyword appears in the resume.
- Be concise and practical.
- Do not invent experience that is not present in the resume.

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""
`;

const analysisSchema = {
  type: "object",
  properties: {
    atsScore: {
      type: "integer",
      description: "Overall ATS compatibility score from 0 to 100.",
    },

    matchingSkills: {
      type: "array",
      items: {
        type: "string",
      },
    },

    missingSkills: {
      type: "array",
      items: {
        type: "string",
      },
    },

    strengths: {
      type: "array",
      items: {
        type: "string",
      },
    },

    suggestions: {
      type: "array",
      items: {
        type: "string",
      },
    },

    keywordAnalysis: {
      type: "array",
      items: {
        type: "object",
        properties: {
          keyword: {
            type: "string",
          },
          present: {
            type: "boolean",
          },
        },
        required: ["keyword", "present"],
      },
    },
  },

  required: [
    "atsScore",
    "matchingSkills",
    "missingSkills",
    "strengths",
    "suggestions",
    "keywordAnalysis",
  ],
};

export const analyzeResume = async (resumeText, jobDescription) => {
  const ai = getClient();

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",

    input: ANALYSIS_PROMPT(resumeText, jobDescription),

    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: analysisSchema,
    },
  });

  const rawText = interaction.output_text;

  if (!rawText) {
    const err = new Error("AI returned an empty response.");
    err.statusCode = 502;
    err.publicMessage =
      "The AI analysis returned an empty response. Please try again.";
    throw err;
  }

  try {
    const parsed = JSON.parse(rawText);

    return {
      atsScore: Math.max(
        0,
        Math.min(100, Number(parsed.atsScore) || 0)
      ),

      matchingSkills: Array.isArray(parsed.matchingSkills)
        ? parsed.matchingSkills
        : [],

      missingSkills: Array.isArray(parsed.missingSkills)
        ? parsed.missingSkills
        : [],

      strengths: Array.isArray(parsed.strengths)
        ? parsed.strengths
        : [],

      suggestions: Array.isArray(parsed.suggestions)
        ? parsed.suggestions
        : [],

      keywordAnalysis: Array.isArray(parsed.keywordAnalysis)
        ? parsed.keywordAnalysis
        : [],
    };
  } catch (err) {
    console.error("Failed to parse Gemini response:", rawText);

    const parseErr = new Error(
      "Failed to parse AI analysis response."
    );

    parseErr.statusCode = 502;
    parseErr.publicMessage =
      "The AI analysis could not be processed. Please try again.";

    throw parseErr;
  }
};