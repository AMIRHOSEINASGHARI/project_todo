"use client";

import { TailSpin } from "react-loader-spinner";

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
    <div className="flex items-center gap-3">
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
