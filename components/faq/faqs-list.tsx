'use client';

import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
interface Props {
  item: any;
  index: number;
}

const FaqsList = ({ item, index }: Props) => {
  const [showFaq, setShowFaq] = useState<boolean>(false);

  const handlerAction = () => {
    setShowFaq((i) => !i);
  };
  return (
    <>
      <div key={index} role="region">
        <h3>
          <button
            onClick={() => handlerAction()}
            className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-semibold sm:p-6"
          >
            <span> {item?.title} </span>
            {item?.id && showFaq ? (
              <MinusIcon
                className="ml-4 size-4"
                onClick={() => handlerAction()}
              />
            ) : (
              <PlusIcon
                className="ml-4 size-4"
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
