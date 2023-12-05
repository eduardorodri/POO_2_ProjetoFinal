import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";

type FormData = {
  nome: string;
  telefone: string;
  funcao: string;
  idGerente: number;
  categoria: string;
};

type Gerente = {
  id: string;
  nome: string;
};

export default function FormContratado() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean);
  const [gerenteData, setGerenteData] = useState<Gerente[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const fetchGerente = async () => {
    try {
      const response = await fetch("http://localhost:8081/gerente");

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setGerenteData(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchGerente();
  }, []);

  const createGerente = async (data: FormData) => {
    setLoading(true);

    if (data.categoria === "contratado") {
      try {
        const response = await fetch(
          `http://localhost:8081/contratado/${data.idGerente}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          setSuccessMessage("Funcionário criado com sucesso!");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
          reset();
          setLoading(false);
        } else {
          console.error("Falha ao excluir gerente");
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro: ", error);
        setLoading(false);
      }
    } else if (data.categoria === "terceirizado") {
      try {
        const response = await fetch(
          `http://localhost:8081/terceirizado/${data.idGerente}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          setSuccessMessage("Funcionário criado com sucesso!");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
          reset();
          setLoading(false);
        } else {
          console.error("Falha ao criar funcionário");
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro: ", error);
        setLoading(false);
      }
    }
  };

  return (
    <details className="w-[1200px]">
      <summary className="text-2xl p-3 bg-white cursor-pointer">
        Cadastro Funcionário
      </summary>
      <div className="mt-1 p-8 pl-20 pr-20 bg-white border-black border">
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <form className="flex flex-col" onSubmit={handleSubmit(createGerente)}>
          <label htmlFor="">Gerente</label>
          <select
            {...register("idGerente", { required: "Campo obrigatório" })}
            className="bg-gray-200 pl-2 h-8 mt-1"
          >
            {gerenteData &&
              gerenteData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}
          </select>
          {errors.idGerente && (
            <p className="text-red-500">{errors.idGerente.message}</p>
          )}

          <label className="mt-3">Nome</label>
          <input
            className="bg-gray-200 p-2 h-8 mt-1"
            type="text"
            {...register("nome", { required: "Campo obrigatório" })}
          />
          {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}

          <label className="mt-3" htmlFor="">
            Telefone
          </label>
          <input
            className="bg-gray-200 p-2 h-8 mt-1"
            type="text"
            {...register("telefone", { required: "Campo obrigatório" })}
          />
          {errors.telefone && (
            <p className="text-red-500">{errors.telefone.message}</p>
          )}

          <label className="mt-3" htmlFor="">
            Função
          </label>
          <input
            className="bg-gray-200 p-2 h-8 mt-1"
            type="text"
            {...register("funcao", { required: "Campo obrigatório" })}
          />
          {errors.funcao && (
            <p className="text-red-500">{errors.funcao.message}</p>
          )}

          <label className="mt-3" htmlFor="">
            Categoria
          </label>
          <select
            {...register("categoria", { required: "Campo obrigatório" })}
            className="bg-gray-200 pl-2 h-8 mt-1"
          >
            <option value="terceirizado">Terceirizado</option>
            <option value="contratado">Contratado</option>
          </select>
          {errors.idGerente && (
            <p className="text-red-500">{errors.idGerente.message}</p>
          )}

          <div className="m-auto mt-6">
            <Button loading={loading} title="Cadastrar" />
          </div>
        </form>
      </div>
    </details>
  );
}
