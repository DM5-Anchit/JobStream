export function calculateMatchScore(candidate, job) {
  let score = 0;

  const skillOverlap = candidate.skills.filter(skill =>
    job.description.toLowerCase().includes(skill.toLowerCase())
  ).length;

  score += skillOverlap * 10;

  candidate.job_titles.forEach(title => {
    if (job.title.toLowerCase().includes(title.toLowerCase())) {
      score += 20;
    }
  });

  score += candidate.experience_years * 2;

  return score;
}

export function matchJobs(candidate, jobs) {
  const scored = jobs.map(job => ({
    ...job,
    match_score: calculateMatchScore(candidate, job)
  }));

  return scored
    .sort((a, b) => b.salary.max - a.salary.max || b.match_score - a.match_score)
    .slice(0, 15);
}
