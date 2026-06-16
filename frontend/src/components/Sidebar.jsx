export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#170C79] text-white p-6">
      <h1 className="text-xl font-bold mb-8">Smart Campus</h1>

      <ul className="space-y-4">
        <li className="hover:text-[#56B6C6] cursor-pointer">Home</li>
        <li className="hover:text-[#56B6C6] cursor-pointer">AI Assistant</li>
        <li className="hover:text-[#56B6C6] cursor-pointer">Timetable</li>
        <li className="hover:text-[#56B6C6] cursor-pointer">Campus Guide</li>
        <li className="hover:text-[#56B6C6] cursor-pointer">Announcements</li>
        <li className="hover:text-[#56B6C6] cursor-pointer">Profile</li>
      </ul>
    </aside>
  );
}
