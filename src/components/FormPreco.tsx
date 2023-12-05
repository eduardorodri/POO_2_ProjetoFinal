import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";

type FormData = {
  tipoServico: string;
  preco: number;
  idGerente: number;
};

type Gerente = {
  id: string;
  nome: string;
};

export default function FormPreco() {
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
    try {
      const response = await fetch("http://localhost:8081/preco", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccessMessage("Preço criado com sucesso!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        reset();
        setLoading(false);
      } else {
        console.error("Falha ao criar preço");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro: ", error);
      setLoading(false);
    }
  };

  return (
    <details className="w-[1200px]">
      <summary className="text-2xl p-3 bg-white cursor-pointer">Preço</summary>
      <div className="mt-1 p-8 pl-20 pr-20 bg-white border-black border">
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <form className="flex flex-col" onSubmit={handleSubmit(createGerente)}>
          <label htmlFor="">Tipo de Serviço</label>
          <input
            className="bg-gray-200 p-2 h-8 mt-1"
            type="text"
            {...register("tipoServico", { required: "Campo obrigatório" })}
          />
          {errors.tipoServico && (
            <p className="text-red-500">{errors.tipoServico.message}</p>
          )}

          <label className="mt-3" htmlFor="">
            Preço
          </label>
          <input
            className="bg-gray-200 p-2 h-8 mt-1"
            type="number"
            {...register("preco", { required: "Campo obrigatório" })}
          />
          {errors.preco && (
            <p className="text-red-500">{errors.preco.message}</p>
          )}

          <label className="mt-3" htmlFor="">
            Gerente
          </label>
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

          <div className="m-auto mt-6">
            <Button loading={loading} title="Cadastrar" />
          </div>
        </form>
      </div>
    </details>
  );
}
