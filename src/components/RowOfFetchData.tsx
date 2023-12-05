import Button from "./Button";

import { useState } from "react";

import { FaRegTrashAlt } from "react-icons/fa";

type Props = {
  buttonTitle: string;
  title: string;
  titleModal?: string;
  deletePath: boolean;
  deleteMethod?: any;
  onclickButton?: () => void;
  data?: any;
};

export default function RowOfFetchData({
  title,
  buttonTitle,
  titleModal,
  onclickButton,
  data,
  deletePath,
  deleteMethod,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  const click = async () => {
    setShowModal(true);
    onclickButton!();
  };

  return (
    <section>
      <div className="p-3 flex justify-between bg-white w-[1200px]">
        <h1 className="text-2xl">{title}</h1>

        <Button title={buttonTitle} onClick={() => click()} />
      </div>
      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative my-6 mx-auto max-w-3xl min-w-[700px]">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-auto">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">{titleModal}</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <pre className="my-4 text-blueGray-500 text-lg leading-relaxed overflow-y-auto max-h-[500px]">
                      {data &&
                        data.map((item: Record<string, undefined>, index) => (
                          <div key={index} className="flex gap-16 items-center">
                            {JSON.stringify(item, null, 2)}
                            {deletePath && (
                              <span
                                className="text-2xl text-red-600 cursor-pointer hover:bg-red-50 p-3 rounded"
                                onClick={() => deleteMethod(item.id)}
                              >
                                <FaRegTrashAlt />
                              </span>
                            )}
                          </div>
                        ))}
                    </pre>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </section>
  );
}
