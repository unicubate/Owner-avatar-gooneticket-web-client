import { createOnUploadPostAPI } from "@/api/post";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { createEditor, Descendant, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';



interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  defaultValue?: string;
}

// a fix car rien ne functione
const SlateReactInput: React.FC<Props> = ({
  control,
  label = "",
  name,
  errors,
  placeholder = "",
  defaultValue,
}) => {

  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: "Please enter post description"
        }}
        render={({ field: { value, onChange } }) => (
          <Slate editor={editor} initialValue={[]}   onChange={onChange}>
            <Editable className="bg-transparent outline-none border-none p-0" />
          </Slate>
        )}
      />
      {errors?.[name] && (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { SlateReactInput };
