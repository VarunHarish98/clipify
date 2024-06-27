import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="p-10 flex flex-col items-center justify-center" id="error-page">
      <h1 className="text-4xl font-bold pb-8">Oops!</h1>
      <p className="pb-5">Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-gray-500">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}