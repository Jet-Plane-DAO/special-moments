import React from "react";
import Button from "../Button";

export interface ButtonHeaderProps {
  label: string;
  action: () => void;
}

export default function ButtonHeader({ label, action }: ButtonHeaderProps) {
  return <Button onClick={() => action()}>{label}</Button>;
}
