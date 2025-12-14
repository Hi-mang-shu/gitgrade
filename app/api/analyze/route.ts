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

const commitsCount = Array.isArray(commits) ? commits.length : 0;
const languageCount = Object.keys(languages).length;

let score = 0;
let roadmap: string[] = [];

// README check
if (repoData.description) {
  score += 20;
} else {
  roadmap.push("Add a clear README with project overview and setup instructions.");
}

// Commit activity
if (commitsCount >= 20) {
  score += 20;
} else {
  roadmap.push("Commit more frequently with meaningful commit messages.");
}

// Project size / effort
if (repoData.size > 500) {
  score += 20;
} else {
  roadmap.push("Expand the project with more features or better structure.");
}

// Tech stack usage
if (languageCount >= 2) {
  score += 20;
} else {
  roadmap.push("Use appropriate technologies or libraries to improve project depth.");
}

// Community / best practices
if (repoData.forks_count > 0 || repoData.stargazers_count > 0) {
  score += 20;
} else {
  roadmap.push("Improve project quality and visibility to encourage stars or forks.");
}

// Clamp score
if (score > 100) score = 100;

// Summary generation
let summary = "";
if (score >= 80) {
  summary = "The repository is well-structured with good development practices and real-world relevance.";
} else if (score >= 50) {
  summary = "The project shows potential but needs improvements in documentation, structure, or consistency.";
} else {
  summary = "The repository is at an early stage and requires significant improvement in multiple areas.";
}

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
