"use client"

import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

interface Props {
  item: any;
  index: number;
}

const FaqsList: React.FC<Props> = ({ item, index }) => {
  const [showFaq, setShowFaq] = useState<boolean>(false);

  const handlerAction = () => {
    setShowFaq((i) => !i);
  };
  return (
    <>
      <div key={index} role="region">
        <h3>
          <button onClick={() => handlerAction()} className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-semibold text-gray-900 sm:p-6">
            <span> {item?.title} </span>
            {item?.id && showFaq ? (
              <BiMinus
                className="ml-4"
                onClick={() => handlerAction()}
              />
            ) : (
              <BiPlus
                className="ml-4"
                onClick={() => handlerAction()}
              />
            )}
          </button>
        </h3>

        {item?.id && showFaq ? (
          <div className="px-6 pb-6">
            <p className="text-base text-gray-600">{item?.description}</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export { FaqsList };
