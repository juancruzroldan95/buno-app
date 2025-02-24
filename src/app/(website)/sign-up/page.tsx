import Link from "next/link";
import SignUpForm from "./components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registrate en Buno
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿Ya tenés una cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Iniciá sesión
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
}
