import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  setor: string;
};

export default function FormGerente() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const createGerente = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8081/gerente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccessMessage("Gerente criado com sucesso!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        reset();
        setLoading(false);
      } else {
        console.error("Falha ao criar gerente");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro: ", error);
      setLoading(false);
    }
  };

  return (
    <details className="w-[1200px]">
      <summary className="text-2xl p-3 bg-white cursor-pointer">
        Gerente
      </summary>
      <div className="mt-1 p-8 pl-20 pr-20 bg-white border-black border">
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <form className="flex flex-col" onSubmit={handleSubmit(createGerente)}>
          <label htmlFor="">Nome</label>
          <input
            className="bg-gray-200 p-2 h-8 mt-1"
            type="text"
            {...register("nome", { required: "Campo obrigatório" })}
          />
          {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}

          <label className="mt-3" htmlFor="">
            E-mail
          </label>
          <input
            className="bg-gray-200 p-2 h-8 mt-1"
            type="email"
            {...register("email", { required: "Campo obrigatório" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <label className="mt-3" htmlFor="">
            Telefone
          </label>
          <input
            className="bg-gray-200 p-2 h-8 mt-1"
            type="number"
            {...register("telefone", { required: "Campo obrigatório" })}
          />
          {errors.telefone && (
            <p className="text-red-500">{errors.telefone.message}</p>
          )}

          <label className="mt-3" htmlFor="">
            Setor
          </label>
          <input
            className="bg-gray-200 h-8 p-2 mt-1"
            type="text"
            {...register("setor", { required: "Campo obrigatório" })}
          />
          {errors.setor && (
            <p className="text-red-500">{errors.setor.message}</p>
          )}

          <div className="m-auto mt-6">
            <Button loading={loading} title="Cadastrar" />
          </div>
        </form>
      </div>
    </details>
  );
}
