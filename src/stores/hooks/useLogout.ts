import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/authSlice";
import { logoutUser } from "@/domain/usecases/AuthUseCases";
import { authApi } from "@/infrastructure/api/AuthApi";
import { toast } from "sonner";

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(authApi);
      dispatch(setUser(null));
      navigate("/login");
    } catch {
      toast.error("Falha ao deslogar usuário");
    }
  };

  return { handleLogout };
}
