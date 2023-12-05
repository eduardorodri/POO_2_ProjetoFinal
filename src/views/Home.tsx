import ProjetoPoo from "../assets/projeto-poo.png"

export default function Home() {
  return (
    <section className="w-full h-[100vh] bg-[#D5BDAF]">
      <div className="flex h-full justify-center items-center flex-col gap-8">
        <h1 className="text-2xl">CRUDE TESTER</h1>
        <div className="flex-col text-center flex gap-6 w-80 justify-center">
          <a
            href="/get"
            className="p-3 text-xl cursor-pointer text-white bg-[#6F5E5C] hover:bg-[#8a7573]"
          >
            GET
          </a>
          <a
            href="/post"
            className="p-3 text-xl cursor-pointer text-white bg-[#6F5E5C] hover:bg-[#8a7573]"
          >
            POST
          </a>
          <a
            href="/put"
            className="p-3 text-xl cursor-pointer text-white bg-[#6F5E5C] hover:bg-[#8a7573]"
          >
            PUT
          </a>
          <a
            href="/delete"
            className="p-3 text-xl cursor-pointer text-white bg-[#6F5E5C] hover:bg-[#8a7573]"
          >
            DELETE
          </a>
        </div>
        <div className="w-[550px] h-[350px]">
          {/* <p className="w-[500px] h-[300px] bg-white">Esquema do banco</p> */}
          <img src={ProjetoPoo} alt="" className="w-full h-full bg-white" />
        </div>
      </div>
    </section>
  );
}
