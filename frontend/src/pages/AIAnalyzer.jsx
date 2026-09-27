import { useEffect, useState } from "react";
import { Sparkles, CheckCircle2, XCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.jsx";
import ScoreCard from "../components/ScoreCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import api, { getErrorMessage } from "../services/api.js";

const AIAnalyzer = () => {
  const [resume, setResume] = useState(null);
  const [checkingResume, setCheckingResume] = useState(true);
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const { data } = await api.get("/resume");
        setResume(data.resume);
      } catch {
        setResume(null);
      } finally {
        setCheckingResume(false);
      }
    };
    check();
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setAnalyzing(true);
    try {
      const { data } = await api.post("/ai/analyze", { jobDescription });
      setResult(data.analysis);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <DashboardLayout title="AI Analyzer" subtitle="See how your resume matches a specific job description.">
      {checkingResume ? (
        <LoadingSpinner label="Checking your resume" />
      ) : !resume ? (
        <div className="card max-w-lg">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-surface">
            <FileText size={18} className="text-primary-dark" />
          </div>
          <h2 className="text-sm font-semibold text-ink">No resume on file yet</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Upload your resume to start analyzing your applications.
          </p>
          <Link to="/resume" className="btn-primary mt-4 inline-flex">
            Upload Resume
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card h-fit">
            <h2 className="text-sm font-semibold text-ink">Job Description</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Paste the job posting you want to compare your resume against.
            </p>
            <form onSubmit={handleAnalyze} className="mt-4">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={12}
                required
                minLength={20}
                placeholder="Paste the full job description here..."
                className="field-input resize-none"
              />
              {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
              <button type="submit" disabled={analyzing} className="btn-primary mt-4 w-full">
                <Sparkles size={16} />
                {analyzing ? "Analyzing..." : "Analyze Resume"}
              </button>
            </form>
          </div>

          <div>
            {analyzing ? (
              <div className="card">
                <LoadingSpinner label="Comparing your resume with this role" />
              </div>
            ) : result ? (
              <div className="space-y-5">
                <ScoreCard score={result.atsScore} />

                <div className="card">
                  <h3 className="text-sm font-semibold text-ink">Matching Skills</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.matchingSkills.length === 0 && (
                      <p className="text-sm text-ink-soft">No direct matches found.</p>
                    )}
                    {result.matchingSkills.map((skill) => (
                      <span key={skill} className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-ink">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-sm font-semibold text-ink">Missing Skills</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.missingSkills.length === 0 && (
                      <p className="text-sm text-ink-soft">Nothing important looks missing.</p>
                    )}
                    {result.missingSkills.map((skill) => (
                      <span key={skill} className="rounded-md bg-neutral px-2.5 py-1 text-xs font-medium text-ink-soft">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-sm font-semibold text-ink">Resume Strengths</h3>
                  <ul className="mt-3 space-y-2">
                    {result.strengths.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-soft">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary-dark" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-sm font-semibold text-ink">Improvement Suggestions</h3>
                  <ol className="mt-3 space-y-2.5">
                    {result.suggestions.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-ink">
                          {i + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="card">
                  <h3 className="text-sm font-semibold text-ink">Keyword Analysis</h3>
                  <div className="mt-3 divide-y divide-ink/5">
                    {result.keywordAnalysis.map((k) => (
                      <div key={k.keyword} className="flex items-center justify-between py-2">
                        <span className="text-sm text-ink">{k.keyword}</span>
                        {k.present ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#48562F]">
                            <CheckCircle2 size={13} /> Present
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#7A4646]">
                            <XCircle size={13} /> Missing
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center py-14 text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-surface">
                  <Sparkles size={18} className="text-primary-dark" />
                </div>
                <p className="text-sm font-medium text-ink">Results will appear here</p>
                <p className="mt-1 text-sm text-ink-soft">Paste a job description and run an analysis.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AIAnalyzer;
