import { GoogleGenerativeAI } from "@google/generative-ai";

export async function extractProfile(resumeText) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Extract structured candidate information from this resume.

Return strictly JSON:

{
  "name": "",
  "experience_years": number,
  "job_titles": [],
  "skills": []
}

Resume:
${resumeText}
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  try {
    return JSON.parse(response);
  } catch {
    return {
      name: "Unknown",
      experience_years: 0,
      job_titles: [],
      skills: []
    };
  }
}
