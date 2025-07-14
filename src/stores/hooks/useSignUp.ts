import { useNavigate } from "react-router";
import { signUpUser } from "@/domain/usecases/AuthUseCases";
import { authApi } from "@/infrastructure/api/AuthApi";
import { toast } from "sonner";

export function useSignUp() {
  const navigate = useNavigate();

  const handleSignUp = async (
    email: string,
    password: string,
    userName: string
  ) => {
    try {
      const makeSignUp = signUpUser(authApi);
      await makeSignUp(email, password, userName);

      navigate("/login");
    } catch {
      toast.error("Falha ao cadastrar usuário");
    }
  };

  return { handleSignUp };
}
