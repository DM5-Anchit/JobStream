import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateCoverLetter(candidate, job) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Write a concise professional cover letter (150 words).

Candidate:
Name: ${candidate.name}
Skills: ${candidate.skills.join(", ")}
Experience: ${candidate.experience_years} years

Job:
Title: ${job.title}
Company: ${job.company}
Description: ${job.description}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
