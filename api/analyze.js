import pdf from "pdf-parse";
import { extractProfile } from "../lib/extractProfile.js";
import { fetchJobs } from "../lib/fetchJobs.js";
import { matchJobs } from "../lib/matchJobs.js";
import { generateCoverLetter } from "../lib/generateCoverLetter.js";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  const pdfData = await pdf(buffer);
  const resumeText = pdfData.text;

  const candidate = await extractProfile(resumeText);

  const jobs = await fetchJobs(candidate.job_titles[0] || "developer");

  const matchedJobs = matchJobs(candidate, jobs);

  const coverLetters = await generateCoverLetters(candidate, matchedJobs);

  coverLetters.forEach(item => {
  const index = item.jobIndex - 1;
  if (matchedJobs[index]) {
    matchedJobs[index].cover_letter = item.cover_letter;
  }
  });


  res.status(200).json({
    status: "success",
    candidate_profile: candidate,
    jobs: matchedJobs
  });
}
