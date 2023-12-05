import RowOfFetchData from "../components/RowOfFetchData";

import { AiOutlineArrowLeft } from "react-icons/ai";

import { useState } from "react";

export default function Get() {
  const [gerenteData, setGerenteData] = useState();
  const [pedidoData, setPedidoData] = useState();
  const [precoData, setPrecoData] = useState();
  const [funcionarioData, setFuncionarioData] = useState();
  const [terceirizadoData, setTerceirizadoData] = useState();

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
  const fetchPedido = async () => {
    try {
      const response = await fetch("http://localhost:8081/pedido");

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setPedidoData(data);
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
  const fetchFuncionario = async () => {
    try {
      const response = await fetch("http://localhost:8081/contratado");

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setFuncionarioData(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };
  const fetchTerceirizado = async () => {
    try {
      const response = await fetch("http://localhost:8081/terceirizado");

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setTerceirizadoData(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <section className="bg-[#D5BDAF] h-[100vh] ">
      <div className="flex flex-col justify-center items-center h-full gap-10">
        <div className="flex w-[1200px] justify-start">
          <a
            href="/"
            className="bg-[#6F5E5C] cursor-pointer text-white p-2 hover:bg-[#8a7573] text-lg"
          >
            <AiOutlineArrowLeft />
          </a>
        </div>
        <RowOfFetchData
          deletePath={false}
          buttonTitle="Puxar dados"
          title="Gerente"
          titleModal="Gerentes"
          onclickButton={fetchGerente}
          data={gerenteData}
        />

        <RowOfFetchData
          deletePath={false}
          buttonTitle="Puxar dados"
          title="Pedido"
          titleModal="Pedidos"
          onclickButton={fetchPedido}
          data={pedidoData}
        />

        <RowOfFetchData
          deletePath={false}
          buttonTitle="Puxar dados"
          title="Preço"
          titleModal="Preços"
          onclickButton={fetchPreco}
          data={precoData}
        />

        <RowOfFetchData
          deletePath={false}
          buttonTitle="Puxar dados"
          title="Funcionário Contratato"
          titleModal="Funcionários Contratatos"
          onclickButton={fetchFuncionario}
          data={funcionarioData}
        />

        <RowOfFetchData
          deletePath={false}
          buttonTitle="Puxar dados"
          title="Funcionário Terceirizado"
          titleModal="Funcionários Terceirizados"
          onclickButton={fetchTerceirizado}
          data={terceirizadoData}
        />
      </div>
    </section>
  );
}
