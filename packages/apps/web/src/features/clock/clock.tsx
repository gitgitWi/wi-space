"use client";

import { useState } from "react";
import { useInterval } from "usehooks-ts";

export function Clock() {
  const [now, setNow] = useState("");

  useInterval(() => {
    setNow(new Date().toLocaleString("ko"));
  }, 1_000);

  return <div className="w-max font-thin text-nowrap text-sm">{now}</div>;
}
