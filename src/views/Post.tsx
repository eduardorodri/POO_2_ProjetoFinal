import { AiOutlineArrowLeft } from "react-icons/ai";
import FormGerente from "../components/FormGerente";
import FormPreco from "../components/FormPreco";
import FormFuncionarios from "../components/FormFuncionarios";
import FormPedido from "../components/FormPedido";

export default function Post() {
  return (
    <section>
      <div className="p-5 min-h-screen overflow-y-auto bg-[#D5BDAF]  flex flex-col justify-center items-center gap-6">
        <div className="flex w-[1200px] justify-start">
          <a
            href="/"
            className="bg-[#6F5E5C] cursor-pointer text-white p-2 hover:bg-[#8a7573] text-lg"
          >
            <AiOutlineArrowLeft />
          </a>
        </div>
        {/* GERENTE */}
        <FormGerente />

        {/* Preço */}
        <FormPreco />

        {/* Funcionário */}
        <FormFuncionarios />

        {/* Pedido */}
        <FormPedido />
      </div>
    </section>
  );
}
