import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";

type FormData = {
  idPreco: number;
  dataFinalizacao: string;
  dataEmissao: string;
  idFuncionario: number;
};

type Contratado = {
  id: string;
  nome: string;
};
type Preco = {
  id: string;
  tipoServico: string;
};

export default function FormPedido() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean);
  const [contratadoData, setContratadoData] = useState<Contratado[]>([]);
  const [precoData, setPrecoData] = useState<Preco[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const fetchContratado = async () => {
    try {
      const response = await fetch("http://localhost:8081/contratado");

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setContratadoData(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const fetchPreco = async () => {
    try {
      const response = await fetch("http://localhost:8081/preco");

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setPrecoData(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchContratado();
    fetchPreco();
  }, []);

  const createGerente = async (data: FormData) => {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8081/pedido`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccessMessage("Pedido criado com sucesso!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        reset();
        setLoading(false);
      } else {
        console.error("Falha ao criar Pedido");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro: ", error);
      setLoading(false);
    }
  };

  return (
    <details className="w-[1200px]">
      <summary className="text-2xl p-3 bg-white cursor-pointer">Pedido</summary>
      <div className="mt-1 p-8 pl-20 pr-20 bg-white border-black border">
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <form className="flex flex-col" onSubmit={handleSubmit(createGerente)}>
          <label htmlFor="">Funcionário contratado</label>
          <select
            {...register("idFuncionario", { required: "Campo obrigatório" })}
            className="bg-gray-200 pl-2 h-8 mt-1"
          >
            {contratadoData &&
              contratadoData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}
          </select>
          {errors.idFuncionario && (
            <p className="text-red-500">{errors.idFuncionario.message}</p>
          )}

          <label className="mt-3">Data de emissão</label>
          <input
            className="bg-gray-200 p-2 h-8 mt-1"
            type="text"
            {...register("dataEmissao", { required: "Campo obrigatório" })}
          />
          {errors.dataEmissao && (
            <p className="text-red-500">{errors.dataEmissao.message}</p>
          )}

          <label className="mt-3" htmlFor="">
            Data finalização
          </label>
          <input
            className="bg-gray-200 p-2 h-8 mt-1"
            type="text"
            {...register("dataFinalizacao", { required: "Campo obrigatório" })}
          />
          {errors.dataFinalizacao && (
            <p className="text-red-500">{errors.dataFinalizacao.message}</p>
          )}

          <label htmlFor="">Serviço</label>
          <select
            {...register("idPreco", { required: "Campo obrigatório" })}
            className="bg-gray-200 pl-2 h-8 mt-1"
          >
            {precoData &&
              precoData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.tipoServico}
                </option>
              ))}
          </select>
          {errors.idPreco && (
            <p className="text-red-500">{errors.idPreco.message}</p>
          )}

          <div className="m-auto mt-6">
            <Button loading={loading} title="Cadastrar" />
          </div>
        </form>
      </div>
    </details>
  );
}
