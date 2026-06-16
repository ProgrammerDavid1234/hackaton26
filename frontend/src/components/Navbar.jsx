export default function Navbar({ title }) {
  return (
    <nav className="flex justify-between items-center bg-white px-6 py-4 shadow">
      <h2 className="text-xl font-semibold text-[#170C79]">{title}</h2>

      <div className="flex items-center gap-3">
        <input
          placeholder="Search campus info..."
          className="border px-3 py-2 rounded-lg text-sm"
        />

        <button className="bg-[#56B6C6] text-white px-4 py-2 rounded-lg">
          Ask AI
        </button>

        <div className="w-8 h-8 bg-[#170C79] rounded-full"></div>
      </div>
    </nav>
  );
}
