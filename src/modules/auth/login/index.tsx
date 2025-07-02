import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/stores/hooks/useLogin";
import type { FormEvent } from "react";

interface CustomElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export function Login() {
  const { handleLogin } = useLogin();

  function submitForm(e: FormEvent<CustomForm>) {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    console.log({ email, password });

    handleLogin(email, password);
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Card className="max-w-md w-full p-8">
        <CardTitle>Fiap Farm - Login</CardTitle>
        <form onSubmit={submitForm} className="flex flex-col gap-4">
          <Input type="email" placeholder="Email" id="email" />
          <Input type="password" placeholder="Email" id="password" />
          <Button type="submit">Entrar</Button>
        </form>
      </Card>
    </div>
  );
}
