"use client";

import { TailSpin } from "react-loader-spinner";
import clsx from "clsx";

const Loader = ({
  width,
  height,
  color,
  text,
}: {
  width?: number;
  height?: number;
  color?: string;
  text?: string;
}) => {
  return (
    <div
      className={clsx("flex items-center gap-3", {
        "text-gray-700": text,
      })}
    >
      <TailSpin
        visible={true}
        height={height || 20}
        width={width || 20}
        color={color || "#000"}
        ariaLabel="tail-spin-loading"
        radius="1"
      />
      {text && <p className="text-[12px]">{text}</p>}
    </div>
  );
};

export default Loader;
