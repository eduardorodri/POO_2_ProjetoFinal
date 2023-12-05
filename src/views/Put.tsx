import { AiOutlineArrowLeft } from "react-icons/ai";

import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useState } from "react"

type GerenteType = {
  nome: string;
  email: string;
  telefone: string;
  setor: string;
  id?: string;
}

type PrecoType = {
  id?: string;
  idGerente?: string;
  tipoServico: string;
  preco: string;
}

type FuncionarioType = {
  id?: string;
  idGerente?: string;
  nome: string;
  telefone: string;
  funcao: string;
  categoria: string;
}

type PedidoType = {
  id?: string;
  idFuncionario: string;
  idPreco: string;
  dataEmissao: string;
  dataFinalizacao: string;
}

export default function Put() {

  const [gerenteData, setGerenteData] = useState<GerenteType[]>([]);
  const [precoData, setPrecoData] = useState<PrecoType[]>([])
  const [funcionarioData, setFuncionarioData] = useState<FuncionarioType[]>([])
  const [pedidoData, setPedidoData] = useState<PedidoType[]>([])

  const [loaders, setLoaders] = useState({
    gerente: false,
    preco: false,
    funcionario: false,
    pedido: false
  })

  const [successMessage, setSuccessMessage] = useState<string>("")

  const { register: regGerente, handleSubmit, setValue: setValueGerente } = useForm<GerenteType>();
  const { register: regPreco, handleSubmit: handlePreco, setValue: setValuePreco } = useForm<PrecoType>();
  const { register: regFunc, handleSubmit: handleFunc, setValue: setValueFunc } = useForm<FuncionarioType>();
  const { register: regPedido, handleSubmit: handlePedido, setValue: setValuePedido } = useForm<PedidoType>();

  const getGerenteData = async () => {
    const response = await fetch("http://localhost:8081/gerente")
    setGerenteData(await response.json());
  }

  const getPrecoData = async () => {
    const response = await fetch("http://localhost:8081/preco")
    setPrecoData(await response.json());
  }

  const getFuncionarioData = async () => {
    if (funcionarioData.length > 0) {
      return;
    }

    const resContratado = await fetch("http://localhost:8081/contratado")
    const resTerceirizado = await fetch("http://localhost:8081/terceirizado")

    const jsonContratado = await resContratado.json()
    const jsonTerceirizado = await resTerceirizado.json()

    jsonContratado.forEach((el: FuncionarioType) => {
      setFuncionarioData(prev => {
        return [...prev, { ...el, categoria: "Contratado" }]
      })
    });

    jsonTerceirizado.forEach((el: FuncionarioType) => {
      setFuncionarioData(prev => {
        return [...prev, { ...el, categoria: "Terceirizado" }]
      })
    });
  }

  const getPedidoData = async () => {
    const response = await fetch("http://localhost:8081/pedido")
    setPedidoData(await response.json())
  }

  const updateGerente = async (data: GerenteType) => {

    setLoaders(prev => { return { ...prev, gerente: true } })
    const response = await fetch(`http://localhost:8081/gerente/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      setSuccessMessage("Gerente atualizado com sucesso!")
    }

    setLoaders(prev => { return { ...prev, gerente: false } })
  }

  const updatePreco = async (data: PrecoType) => {

    setLoaders(prev => { return { ...prev, preco: true } })
    const response = await fetch(`http://localhost:8081/preco/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      setSuccessMessage("Preço atualizado com sucesso!")
    }

    setLoaders(prev => { return { ...prev, preco: false } })
  }

  const updateFuncionario = async (data: FuncionarioType) => {

    setLoaders(prev => { return { ...prev, funcionario: true } })

    if (data.categoria == "Contratado") {
      const response = await fetch(`http://localhost:8081/contratado/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setSuccessMessage("Funcionário atualizado com sucesso!")
      }
    } else {
      const response = await fetch(`http://localhost:8081/terceirizado/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setSuccessMessage("Funcionário atualizado com sucesso!")
      }
    }

    setLoaders(prev => { return { ...prev, funcionario: false } })
  }

  const updatePedido = async (data: PedidoType) => {
    setLoaders(prev => { return { ...prev, pedido: true } })
    const response = await fetch(`http://localhost:8081/pedido/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      setSuccessMessage("Pedido atualizado com sucesso!")
    }

    setLoaders(prev => { return { ...prev, pedido: false } })
  }

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
        <details className="w-[1200px]">
          <summary className="text-2xl p-2 bg-white cursor-pointer flex justify-between">
            Gerente
            <select
              className="text-xl w-[300px] text-center bg-gray-200 pl-2 h-8 mt-1 [&>*:first-child]:hidden"
              name=""
              id=""
              onPointerEnter={getGerenteData}
              onChange={(e) => {
                gerenteData.map(el => {
                  if (el.id == e.target.value) {
                    setValueGerente("id", el.id)
                    setValueGerente("nome", el.nome)
                    setValueGerente("email", el.email)
                    setValueGerente("telefone", el.telefone)
                    setValueGerente("setor", el.setor)
                  }
                })
              }}
            >
              <option value="">Selecione o Gerente</option>
              {gerenteData.map(val => (
                <option key={val.id} value={val.id}>{val.nome}</option>
              ))}
            </select>
          </summary>
          <div className="mt-1 p-8 pl-20 pr-20 bg-white border-black border">
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form className="flex flex-col" onSubmit={handleSubmit(updateGerente)}>
              <label htmlFor="">Nome</label>
              <input
                className="bg-gray-200 p-2 h-8 mt-1"
                type="text"
                {...regGerente("nome", { required: "Campo obrigatório" })}
              />
              <label className="mt-3" htmlFor="">
                E-mail
              </label>
              <input
                className="bg-gray-200 p-2 h-8 mt-1"
                type="text"
                {...regGerente("email", { required: "Campo obrigatório" })}
              />
              <label className="mt-3" htmlFor="">
                Telefone
              </label>
              <input
                className="bg-gray-200 p-2 h-8 mt-1"
                type="text"
                {...regGerente("telefone", { required: "Campo obrigatório" })}
              />
              <label className="mt-3" htmlFor="">
                Setor
              </label>
              <input
                className="bg-gray-200 h-8 p-2 mt-1"
                type="text"
                {...regGerente("setor", { required: "Campo obrigatório" })}
              />

              <div className="m-auto mt-6">
                <Button title="Cadastrar" loading={loaders.gerente} />
              </div>
            </form>
          </div>
        </details>

        {/* Preço */}
        <details className="w-[1200px]">
          <summary className="text-2xl p-2 bg-white cursor-pointer flex justify-between">
            Preço
            <select
              className="text-xl w-[300px] text-center bg-gray-200 pl-2 h-8 mt-1 [&>*:first-child]:hidden"
              name=""
              id=""
              onPointerEnter={getPrecoData}
              onChange={(e) => {
                precoData.map(el => {
                  if (el.id == e.target.value) {
                    setValuePreco("id", el.id)
                    setValuePreco("idGerente", el.idGerente)
                    setValuePreco("preco", el.preco)
                    setValuePreco("tipoServico", el.tipoServico)
                  }
                })
              }}
            >
              <option value="">Selecione o Preço</option>
              {precoData.map(val => (
                <option key={val.id} value={val.id}>{val.tipoServico}</option>
              ))}
            </select>
          </summary>
          <div className="mt-1 p-8 pl-20 pr-20 bg-white border-black border">
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form className="flex flex-col" onSubmit={handlePreco(updatePreco)}>
              <label className="mt-3" htmlFor="">
                Tipo de serviço
              </label>
              <input
                className="bg-gray-200 p-2 h-8 mt-1"
                type="text"
                {...regPreco("tipoServico", { required: "Campo obrigatório" })}
              />
              <label className="mt-3" htmlFor="">
                preço
              </label>
              <input
                className="bg-gray-200 p-2 h-8 mt-1"
                type="text"
                {...regPreco("preco", { required: "Campo obrigatório" })}
              />
              <label className="mt-3" htmlFor="">
                Gerente
              </label>
              <select
                className="bg-gray-200 pl-2 h-8 mt-1 [&>*:first-child]:hidden"
                id=""
                onPointerEnter={getGerenteData}
                {...regPreco("idGerente")}
              >
                <option value="">Gerente</option>
                {gerenteData.map(val => (
                  <option key={val.id} value={val.id}>{val.nome}</option>
                ))}
              </select>

              <div className="m-auto mt-6">
                <Button title="Cadastrar" loading={loaders.preco} />
              </div>
            </form>
          </div>
        </details>

        {/* Funcionário */}
        <details className="w-[1200px]">
          <summary className="text-2xl p-2 bg-white cursor-pointer flex justify-between">
            Funcionário
            <select
              className="text-xl w-[300px] text-center bg-gray-200 pl-2 h-8 mt-1 [&>*:first-child]:hidden"
              name=""
              id=""
              onPointerEnter={getFuncionarioData}
              onChange={(e) => {
                funcionarioData.map(el => {
                  if (el.id == e.target.value) {
                    setValueFunc("id", el.id)
                    setValueFunc("idGerente", el.idGerente)
                    setValueFunc("nome", el.nome)
                    setValueFunc("telefone", el.telefone)
                    setValueFunc("funcao", el.funcao)
                    setValueFunc("categoria", el.categoria)
                  }
                })
              }}
            >
              <option value="">Selecione o Funcionário</option>
              {funcionarioData.map(val => (
                <option key={val.id} value={val.id}>{val.nome}</option>
              ))}
            </select>
          </summary>
          <div className="mt-1 p-8 pl-20 pr-20 bg-white border-black border">
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form className="flex flex-col" onSubmit={handleFunc(updateFuncionario)}>
              <label htmlFor="">Gerente</label>
              <select
                className="bg-gray-200 pl-2 h-8 mt-1 [&>*:first-child]:hidden"
                id=""
                onPointerEnter={getGerenteData}
                {...regFunc("idGerente")}
              >
                <option value="">Gerente</option>
                {gerenteData.map(val => (
                  <option key={val.id} value={val.id}>{val.nome}</option>
                ))}
              </select>

              <label className="mt-3" htmlFor="">
                Nome
              </label>
              <input
                className="bg-gray-200 p-2 h-8 mt-1"
                type="text"
                {...regFunc("nome", { required: "Campo obrigatório" })}
              />

              <label className="mt-3" htmlFor="">
                Telefone
              </label>
              <input
                className="bg-gray-200 p-2 h-8 mt-1"
                type="text"
                {...regFunc("telefone", { required: "Campo obrigatório" })}
              />

              <label className="mt-3" htmlFor="">
                Função
              </label>
              <input
                className="bg-gray-200 h-8 p-2 mt-1"
                type="text"
                {...regFunc("funcao", { required: "Campo obrigatório" })}
              />

              <label className="mt-3" htmlFor="">
                Categoria
              </label>
              <input
                className="bg-gray-200 h-8 p-2 mt-1"
                type="text"
                {...regFunc("categoria", { required: "Campo obrigatório" })}
              />

              <div className="m-auto mt-6">
                <Button title="Cadastrar" loading={loaders.funcionario} />
              </div>
            </form>
          </div>
        </details>

        {/* Pedido */}
        <details className="w-[1200px]">
          <summary className="text-2xl p-2 bg-white cursor-pointer flex justify-between">
            Pedido
            <select
              className="text-xl w-[300px] text-center bg-gray-200 pl-2 h-8 mt-1 [&>*:first-child]:hidden"
              name=""
              id=""
              onPointerEnter={getPedidoData}
              onChange={(e) => {
                pedidoData.map(el => {
                  if (el.id == e.target.value) {
                    setValuePedido("id", el.id)
                    setValuePedido("idFuncionario", el.idFuncionario)
                    setValuePedido("idPreco", el.idPreco)
                    setValuePedido("dataEmissao", el.dataEmissao)
                    setValuePedido("dataFinalizacao", el.dataFinalizacao)
                  }
                })
              }}
            >
              <option value="">Selecione o Pedido</option>
              {pedidoData.map(val => (
                <option key={val.id} value={val.id}>{val.id}</option>
              ))}
            </select>
          </summary>
          <div className="mt-1 p-8 pl-20 pr-20 bg-white border-black border">
            <form className="flex flex-col" onSubmit={handlePedido(updatePedido)}>
              <label htmlFor="">Funcionário Contratado</label>
              <select
                className="bg-gray-200 pl-2 h-8 mt-1 [&>*:first-child]:hidden"
                id=""
                onPointerEnter={getFuncionarioData}
                {...regPedido("idFuncionario", { required: "Campo obrigatório" })}
              >
                <option value="">Funcionário Contratado</option>
                {funcionarioData.map(val => (
                  <option key={val.id} value={val.id}>{val.nome}</option>
                ))}
              </select>

              <label className="mt-3" htmlFor="">
                Data de emissão
              </label>
              <input
                className="bg-gray-200 p-2 h-8 mt-1"
                type="text"
                {...regPedido("dataEmissao", { required: "Campo obrigatório" })}
              />

              <label className="mt-3" htmlFor="">
                Data de finalização
              </label>
              <input
                className="bg-gray-200 p-2 h-8 mt-1"
                type="text"
                {...regPedido("dataFinalizacao", { required: "Campo obrigatório" })}
              />

              <label className="mt-3" htmlFor="">
                Serviço
              </label>
              <select
                className="bg-gray-200 pl-2 h-8 mt-1 [&>*:first-child]:hidden"
                id=""
                onPointerEnter={getPrecoData}
                {...regPedido("idPreco", { required: "Campo obrigatório" })}
              >
                <option value="">Serviço</option>
                {precoData.map(val => (
                  <option key={val.id} value={val.id}>{val.tipoServico}</option>
                ))}
              </select>

              <div className="m-auto mt-6">
                <Button title="Cadastrar" loading={loaders.pedido} />
              </div>
            </form>
          </div>
        </details>
      </div>
    </section>
  );
}
