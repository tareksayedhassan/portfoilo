export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-dvh text-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
      >
        ⬅ Go Back Home
      </a>
    </div>
  );
}
