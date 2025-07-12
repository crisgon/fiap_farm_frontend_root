import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/stores/hooks/useSignUp";
import { useState, type FormEvent } from "react";
import { Link } from "react-router";

interface CustomElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  username: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export function Register() {
  const { handleSignUp } = useSignUp();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function submitForm(e: FormEvent<CustomForm>) {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    handleSignUp(email, password, username);
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Card className="max-w-md w-full p-8">
        <CardTitle>Fiap Farm - Criar conta</CardTitle>
        <form onSubmit={submitForm} className="flex flex-col gap-4">
          <Input type="text" placeholder="Usuário" id="username" />
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
          <Button type="submit">Cadastrar</Button>
        </form>

        <Link to="/login" className="text-sm text-primary">
          Voltar para o login
        </Link>
      </Card>
    </div>
  );
}
