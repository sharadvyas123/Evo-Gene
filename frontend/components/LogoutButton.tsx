// app/components/LogoutButton.tsx
"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    // Call API route to clear cookie server-side
    await fetch("/api/logout", { method: "POST" });
    window.location.reload(); // refresh page to update navbar
  };

  return (
    <button
      onClick={handleLogout}
      className="hidden md:block px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-red-400/50 transition-all duration-300 transform hover:scale-105"
    >
      Logout
    </button>
  );
}
