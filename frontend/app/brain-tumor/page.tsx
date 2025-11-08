"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Brain, Loader2 } from "lucide-react";

export default function BrainTumorAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
    setResult(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    // Temporary simulation (replace later with Django API)
    setTimeout(() => {
      setResult("/placeholder.jpg");
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-transparent pt-24">
      {/* 🎬 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🧬 Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-10 relative z-10">
        {/* Glassy Container */}
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-2xl border border-cyan-400/30 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.15)] p-10 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Brain Tumor Analysis 🧠
          </h1>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Upload an MRI scan or drag & drop your image below. Our AI will analyze it for potential tumor regions.
          </p>

          {/* 🩻 Upload Box */}
          <div
            {...getRootProps()}
            className={`w-full max-w-2xl h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 mx-auto ${
              isDragActive
                ? "border-cyan-400 bg-cyan-400/10"
                : "border-cyan-700/50 hover:border-cyan-400 hover:bg-cyan-400/5"
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-12 h-12 mb-3 text-cyan-400" />
            {isDragActive ? (
              <p className="text-cyan-300">Drop your image here...</p>
            ) : (
              <p className="text-gray-400">Drag & drop your MRI image, or click to select</p>
            )}
          </div>

          {/* 🖼 Preview */}
          {preview && (
            <div className="mt-8">
              <h2 className="text-lg mb-3 text-gray-300">🩺 Selected Image:</h2>
              <img
                src={preview}
                alt="Uploaded MRI"
                className="w-full max-w-md rounded-xl shadow-lg border border-cyan-700/30 mx-auto"
              />
            </div>
          )}

          {/* ⚙️ Analyze Button */}
          {file && (
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white 
                         hover:scale-105 transition-transform flex items-center gap-2 shadow-cyan-500/30 disabled:opacity-50 mx-auto"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
              {loading ? "Analyzing..." : "Generate Analysis"}
            </button>
          )}

          {/* 🧩 Result */}
          {result && (
            <div className="mt-12">
              <h2 className="text-xl mb-4 text-cyan-400">AI-Generated Output:</h2>
              <img
                src={result}
                alt="Analyzed result"
                className="w-full max-w-md rounded-xl shadow-lg border border-cyan-700/30 mx-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
