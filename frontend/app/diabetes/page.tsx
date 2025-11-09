// "use client";

// import { useState } from "react";
// import { Brain, Loader2 } from "lucide-react";
// import Link from "next/link";

// export default function DiabetesPage() {
//   const [formData, setFormData] = useState({
//     glucose: "",
//     blood_pressure_systolic: "",
//     blood_pressure_diastolic: "",
//     skin_thickness: "",
//     insulin: "",
//     bmi: "",
//     age: "",
//     pregnancies: "",
//     diabetes_pedigree_function: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<null | { result: string; probability: number }>(null);
//   const [error, setError] = useState<string>("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/diabetes/predict/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.detail || "Prediction failed");
//       setResult({ result: data.result, probability: data.probability });
//     } catch (err: any) {
//       console.error("Prediction error:", err);
//       setError(err.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-transparent pt-24">

//       {/* ✅ CLICKABLE LOGO (top-left) */}
//       <div className="absolute top-6 left-6 z-50 cursor-pointer">
//   <Link href="/">
//     <div className="flex items-center gap-3">
//       <img
//         src="/apple-icon.png"
//         alt="EvoGene Logo"
//         className="w-10 h-10 rounded-lg shadow-lg hover:scale-105 transition-transform"
//       />
//       <span className="text-white font-bold text-xl drop-shadow-lg">EvoGene</span>
//     </div>
//   </Link>
// </div>


//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover -z-0"
//       >
//         <source src="bg.mp4" type="video/mp4" />
//       </video>

//       <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#020617] via-[#0b1120] to-[#020617] text-white px-6 py-10">

//         <div className="w-full max-w-3xl bg-white/10 border border-cyan-500/30 backdrop-blur-lg rounded-2xl shadow-lg p-10">
//           <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//             Diabetes Prediction 🩸
//           </h1>

//           <p className="text-center text-gray-400 mb-8">
//             Enter your medical details below and EvoGene AI will predict your diabetes risk.
//           </p>

//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             {/* Glucose */}
//             <div className="flex flex-col">
//               <label className="mb-2 text-sm text-gray-300">Glucose</label>
//               <input
//                 type="number"
//                 name="glucose"
//                 value={formData.glucose}
//                 onChange={handleChange}
//                 placeholder="Enter glucose level"
//                 className="p-3 rounded-lg bg-[#0f172a] border border-cyan-700/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                 required
//               />
//             </div>

//             {/* Blood Pressure */}
//             <div className="flex flex-col">
//               <label className="mb-2 text-sm text-gray-300">Blood Pressure (mm Hg)</label>
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   name="blood_pressure_systolic"
//                   value={formData.blood_pressure_systolic}
//                   onChange={handleChange}
//                   placeholder="Systolic (e.g. 120)"
//                   className="p-3 w-1/2 rounded-lg bg-[#0f172a] border border-cyan-700/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                   required
//                 />
//                 <input
//                   type="number"
//                   name="blood_pressure_diastolic"
//                   value={formData.blood_pressure_diastolic}
//                   onChange={handleChange}
//                   placeholder="Diastolic (e.g. 80)"
//                   className="p-3 w-1/2 rounded-lg bg-[#0f172a] border border-cyan-700/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Skin Thickness */}
//             <div className="flex flex-col">
//               <label className="mb-2 text-sm text-gray-300">Skin Thickness (mm)</label>
//               <input
//                 type="number"
//                 name="skin_thickness"
//                 value={formData.skin_thickness}
//                 onChange={handleChange}
//                 placeholder="Enter skin thickness"
//                 className="p-3 rounded-lg bg-[#0f172a] border border-cyan-700/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                 required
//               />
//             </div>

//             {/* Insulin */}
//             <div className="flex flex-col">
//               <label className="mb-2 text-sm text-gray-300">Insulin (μU/mL)</label>
//               <input
//                 type="number"
//                 name="insulin"
//                 value={formData.insulin}
//                 onChange={handleChange}
//                 placeholder="Enter insulin level"
//                 className="p-3 rounded-lg bg-[#0f172a] border border-cyan-700/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                 required
//               />
//             </div>

//             {/* BMI */}
//             <div className="flex flex-col">
//               <label className="mb-2 text-sm text-gray-300">BMI (kg/m²)</label>
//               <input
//                 type="number"
//                 name="bmi"
//                 value={formData.bmi}
//                 onChange={handleChange}
//                 placeholder="Enter BMI"
//                 className="p-3 rounded-lg bg-[#0f172a] border border-cyan-700/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                 required
//               />
//             </div>

//             {/* Age */}
//             <div className="flex flex-col">
//               <label className="mb-2 text-sm text-gray-300">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 placeholder="Enter age"
//                 className="p-3 rounded-lg bg-[#0f172a] border border-cyan-700/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                 required
//               />
//             </div>

//             {/* Pregnancies */}
//             <div className="flex flex-col">
//               <label className="mb-2 text-sm text-gray-300">Pregnancies</label>
//               <input
//                 type="number"
//                 name="pregnancies"
//                 value={formData.pregnancies}
//                 onChange={handleChange}
//                 placeholder="Enter number of pregnancies"
//                 className="p-3 rounded-lg bg-[#0f172a] border border-cyan-700/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//               />
//             </div>

//             {/* Diabetes Pedigree Function */}
//             <div className="flex flex-col">
//               <label className="mb-2 text-sm text-gray-300">Diabetes Pedigree Function</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 name="diabetes_pedigree_function"
//                 value={formData.diabetes_pedigree_function}
//                 onChange={handleChange}
//                 placeholder="Enter pedigree function"
//                 className="p-3 rounded-lg bg-[#0f172a] border border-cyan-700/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                 required
//               />
//             </div>

//             {/* Button */}
//             <div className="col-span-1 md:col-span-2 flex justify-center">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="mt-6 px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50"
//               >
//                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
//                 {loading ? "Analyzing..." : "Predict Diabetes"}
//               </button>
//             </div>
//           </form>

//           {/* Error message */}
//           {error && (
//             <p className="text-red-400 text-center mt-4">{error}</p>
//           )}

//           {/* Result */}
//           {result && (
//             <div
//               className={`mt-10 px-8 py-5 text-center text-xl font-semibold rounded-xl ${
//                 result.result === "Diabetic"
//                   ? "bg-red-500/20 border border-red-400 text-red-300"
//                   : "bg-green-500/20 border border-green-400 text-green-300"
//               }`}
//             >
//               {result.result === "Diabetic"
//                 ? `⚠️ The person is likely to have Diabetes (Confidence: ${Math.round(
//                     result.probability * 100
//                   )}%)`
//                 : `✅ The person is not likely to have Diabetes (Confidence: ${Math.round(
//                     result.probability * 100
//                   )}%)`}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
