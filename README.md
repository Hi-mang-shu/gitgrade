# GitGrade – Repository Analyzer

GitGrade is an AI-assisted tool that evaluates a GitHub repository and converts it into a
**Score, Summary, and Personalized Improvement Roadmap**, simulating feedback from a
technical mentor or recruiter.

## 🚀 Problem Statement
Students often push code to GitHub without knowing how clean, complete, or
industry-ready it looks. GitGrade acts as a **Repository Mirror**, reflecting strengths
and weaknesses purely from repository data.

## 🧠 How It Works
1. User pastes a **public GitHub repository URL**
2. GitGrade fetches repository metadata using the GitHub REST API
3. The system evaluates:
   - Commit activity
   - Project size & structure
   - Tech stack usage
   - Documentation presence
   - Community signals (stars/forks)
4. Generates:
   - **Score (0–100)**
   - **Written Summary**
   - **Personalized Roadmap**

## 🧪 Evaluation Logic
The scoring system uses heuristic-based rules derived from real repository signals.
This ensures honest, explainable, and actionable feedback.

## 🛠 Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **API:** GitHub REST API
- **Hosting:** Vercel

## 🌐 Live Demo
👉 **[Live Application](https://gitgrade-lemon.vercel.app/)**
👉 **Demo Video** - https://github.com/user-attachments/assets/5dd74d75-7b9f-4602-995f-992b744051a4 



## ⚠️ Limitations
- Only public repositories are supported
- Static analysis and test coverage detection are heuristic-based
- GitHub API rate limits may apply

## 🎯 Future Improvements
- Deeper static code analysis
- Test coverage detection
- ML-based scoring models
- User authentication and history tracking

---

Built for **GitGrade Hackathon** 🚀
