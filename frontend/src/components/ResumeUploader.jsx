import { useRef, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";

const ResumeUploader = ({ onFileSelected, uploading }) => {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }
    setFileName(file.name);
    onFileSelected(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
      onClick={() => inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors ${
        dragActive ? "border-primary bg-surface/50" : "border-ink/15 bg-white hover:border-primary/40"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-surface">
        {fileName ? <FileText size={18} className="text-primary-dark" /> : <UploadCloud size={18} className="text-primary-dark" />}
      </div>
      <p className="text-sm font-medium text-ink">
        {uploading ? "Uploading..." : fileName || "Drag and drop your resume here"}
      </p>
      <p className="mt-1 text-xs text-ink-soft">PDF only, up to 5MB — or click to browse</p>
    </div>
  );
};

export default ResumeUploader;
