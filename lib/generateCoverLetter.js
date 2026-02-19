import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateCoverLetters(candidate, jobs) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const jobSummaries = jobs.map((job, index) => `
Job ${index + 1}:
Title: ${job.title}
Company: ${job.company}
Description: ${job.description.slice(0, 1000)}
`).join("\n");

  const prompt = `
Generate professional 120-word cover letters for each job below.

Return STRICT JSON array format:

[
  { "jobIndex": 1, "cover_letter": "..." },
  { "jobIndex": 2, "cover_letter": "..." }
]

Candidate:
Name: ${candidate.name}
Skills: ${candidate.skills.join(", ")}
Experience: ${candidate.experience_years} years

Jobs:
${jobSummaries}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    return jobs.map((_, i) => ({
      jobIndex: i + 1,
      cover_letter: "Unable to generate cover letter."
    }));
  }
}
