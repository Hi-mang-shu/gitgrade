import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { repoUrl } = await req.json();

    if (!repoUrl) {
      return NextResponse.json(
        { error: "Repository URL is required" },
        { status: 400 }
      );
    }

    const match = repoUrl.match(
      /github\.com\/([^\/]+)\/([^\/]+)/
    );

    if (!match) {
      return NextResponse.json(
        { error: "Invalid GitHub URL" },
        { status: 400 }
      );
    }

    const owner = match[1];
    const repo = match[2];

    const repoRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    const repoData = await repoRes.json();

    const commitsRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits`
    );
    const commits = await commitsRes.json();

    const languagesRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`
    );
    const languages = await languagesRes.json();

    const contentsRes = await fetch(
  `https://api.github.com/repos/${owner}/${repo}/contents`
);
const contents = await contentsRes.json();

const hasReadme = Array.isArray(contents)
  ? contents.some((item) =>
      item.name.toLowerCase().includes("readme")
    )
  : false;

const commitsCount = Array.isArray(commits) ? commits.length : 0;
const languageCount = Object.keys(languages).length;

let score = 0;
let roadmap: string[] = [];

// README
if (hasReadme) {
  score += 25;
} else {
  score += 5;
  roadmap.push("Add a clear README with project overview and setup instructions.");
}

// Commits
if (commitsCount >= 30) score += 25;
else if (commitsCount >= 10) score += 15;
else {
  score += 5;
  roadmap.push("Commit more frequently with meaningful commit messages.");
}

// Project size
if (repoData.size >= 1000) score += 20;
else if (repoData.size >= 300) score += 10;
else {
  score += 5;
  roadmap.push("Expand the project with more features or better structure.");
}

// Tech stack
if (languageCount >= 2) score += 15;
else score += 5;

// Community
if (repoData.stargazers_count > 0 || repoData.forks_count > 0) {
  score += 15;
} else {
  score += 5;
  roadmap.push("Improve project quality and visibility to encourage stars or forks.");
}

// Clamp score
if (score > 100) score = 100;

// Summary generation
let summary = "";

if (score >= 85) {
  summary =
    "This repository demonstrates strong project structure, consistent development practices, and good real-world applicability.";
} else if (score >= 65) {
  summary =
    "The project is well-structured and shows meaningful effort, but could benefit from improved documentation, testing, or consistency.";
} else if (score >= 40) {
  summary =
    "The repository shows early-stage development with a basic structure and limited consistency, but has clear potential for improvement.";
} else {
  summary =
    "The repository is at an early stage and requires significant improvements in documentation, structure, and development practices.";
}

roadmap = Array.from(new Set(roadmap));

return NextResponse.json({
  name: repoData.name,
  description: repoData.description,
  commitsCount,
  languages: Object.keys(languages),
  score,
  summary,
  roadmap,
});

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
