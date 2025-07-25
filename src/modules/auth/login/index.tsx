import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/stores/hooks/useLogin";
import { useState, type FormEvent } from "react";
import { Link } from "react-router";

interface CustomElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export function Login() {
  const { handleLogin } = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function submitForm(e: FormEvent<CustomForm>) {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    handleLogin(email, password);
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Card className="max-w-md w-full p-8">
        <CardTitle>Fiap Farm - Login</CardTitle>
        <form onSubmit={submitForm} className="flex flex-col gap-4">
          <Input type="email" placeholder="Email" id="email" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            id="password"
          />
          <label className="text-sm">
            <Checkbox onClick={() => setShowPassword(!showPassword)} /> Exibir
            senha
          </label>
          <Button type="submit">Entrar</Button>
        </form>

        <Link to="/register" className="text-sm text-primary">
          Criar conta
        </Link>
      </Card>
    </div>
  );
}
