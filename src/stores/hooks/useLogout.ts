import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/authSlice";
import { logoutUser } from "@/domain/usecases/AuthUseCases";
import { authApi } from "@/infrastructure/api/AuthApi";

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(authApi);
      dispatch(setUser(null));
      navigate("/login");
    } catch {
      console.log({
        type: "error",
        text1: "Falha ao deslogar usuário",
        position: "bottom",
      });
    }
  };

  return { handleLogout };
}
