import { signInUser } from "@/domain/usecases/AuthUseCases";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router";
import { authApi } from "@/infrastructure/api/AuthApi";

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const makeLogin = signInUser(authApi);
      const { userCredential } = await makeLogin(email, password);
      dispatch(setUser(userCredential.user));
      navigate("/home");
    } catch {
      console.log({
        type: "error",
        text1: "Falha ao logar usuário",
        position: "bottom",
      });
    }
  };

  return { handleLogin };
}
