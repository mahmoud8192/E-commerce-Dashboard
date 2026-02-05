import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../services/authService";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Alert from "../../components/common/Alert";
import { Mail, ArrowLeft, ShoppingCart } from "lucide-react";
import { isValidEmail } from "../../utils/validators";

/**
 * Forgot Password Page Component
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    setLoading(true);

    try {
      const result = await authService.forgotPassword(email);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(
          result.message || "Failed to send reset link. Please try again.",
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4">
            <ShoppingCart className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-600">
            Enter your email to reset your password
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-green-600" size={32} />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Check Your Email
              </h3>

              <p className="text-gray-600 mb-6">
                We've sent a password reset link to{" "}
                <span className="font-medium text-gray-900">{email}</span>
              </p>

              <Alert
                type="info"
                message="Didn't receive the email? Check your spam folder or try again."
                dismissible={false}
                className="mb-6"
              />

              <Link to="/login">
                <Button variant="primary" fullWidth>
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <Alert
                  type="error"
                  message={error}
                  onClose={() => setError("")}
                  className="mb-6"
                />
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error && !email ? "Email is required" : ""}
                  placeholder="admin@example.com"
                  icon={<Mail size={18} className="text-gray-400" />}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={loading}
                  disabled={loading}
                >
                  Send Reset Link
                </Button>
              </form>

              <div className="mt-6">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
