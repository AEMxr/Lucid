export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">Lucid</div>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Pricing
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
