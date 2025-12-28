import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div
      id="error-page"
      className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 relative overflow-hidden justify-center items-center"
    >
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none fixed"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none fixed"></div>
      
      <div className="bg-white/60 backdrop-blur-md border border-white/50 p-10 rounded-md shadow-md space-y-5 text-center z-10">
        <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
        <p className="text-lg text-gray-600">Sorry, an unexpected error has occurred.</p>
        <p className="text-sm text-gray-500 italic">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
