const getScoreColor = (score) => {
  if (score >= 75) return "#5C7043";
  if (score >= 50) return "#8B9A6E";
  return "#A9754A";
};

const ScoreCard = ({ score }) => {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="card flex flex-col items-center justify-center py-8">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#EEEEEE" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.4s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-ink">{score}</span>
          <span className="text-xs text-ink-soft">out of 100</span>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-ink">ATS Compatibility Score</p>
    </div>
  );
};

export default ScoreCard;
