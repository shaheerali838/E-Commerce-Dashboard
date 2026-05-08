import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

// Yup validation schema
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const AdminLogin = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitError(null);
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const userDoc = await getDoc(doc(db, "users", cred.user.uid)); // Redirect to dashboard on success
      if (!userDoc.exists() || userDoc.data().role !== "admin") {
        await signOut(auth);
        setSubmitError("Invalid credentials or not an admin.");
        return;
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to login", error);
      setSubmitError("Invalid credentials or not an admin.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>
        {submitError && (
          <div className="mb-4 px-3 py-2 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm">
            {submitError}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            {...register("email")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.password?.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
