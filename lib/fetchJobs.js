import fetch from "node-fetch";
import { parseSalary } from "../utils/salaryParser.js";

export async function fetchJobs(query) {
  const jobs = [];

  const arbeitnow = await fetch("https://www.arbeitnow.com/api/job-board-api");
  const arbeitData = await arbeitnow.json();

  arbeitData.data.forEach(job => {
    jobs.push({
      id: job.slug,
      title: job.title,
      company: job.company_name,
      location: job.location,
      salary: parseSalary(job.salary),
      description: job.description,
      apply_link: job.url
    });
  });

  const remotive = await fetch("https://remotive.com/api/remote-jobs");
  const remotiveData = await remotive.json();

  remotiveData.jobs.forEach(job => {
    jobs.push({
      id: job.id,
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location,
      salary: parseSalary(job.salary),
      description: job.description,
      apply_link: job.url
    });
  });

  return jobs;
}
