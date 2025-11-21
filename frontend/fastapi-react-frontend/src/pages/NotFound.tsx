import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-5xl font-bold text-error">404</h1>
      <p className="text-xl font-semibold">Page not found</p>
      <p className="text-base text-gray-500 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary mt-4">
        ⬅ Back to homepage
      </Link>
    </div>
  );
};

export default NotFound;
