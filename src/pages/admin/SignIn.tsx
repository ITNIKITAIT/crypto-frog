import { useAuth } from "lib/auth/admin/AuthContext";
import SignInForm from "lib/components/SignInForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = (): JSX.Element => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/xxxopernDyn5fYk/admin/accounting");
    }
  }, [navigate, token]);

  return <SignInForm />;
};

SignIn.displayName = "SignIn";

export default SignIn;
