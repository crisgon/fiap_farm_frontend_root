import { useNavigate } from "react-router";
import { signUpUser } from "@/domain/usecases/AuthUseCases";
import { authApi } from "@/infrastructure/api/AuthApi";

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
      console.log({
        type: "error",
        text1: "Falha ao cadastrar usuário",
        position: "bottom",
      });
    }
  };

  return { handleSignUp };
}
