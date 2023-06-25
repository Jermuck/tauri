import { Button } from "@hope-ui/solid";
import { Component } from "solid-js";

interface IButton {
  width: number;
  height: number;
  title: string;
  mt?: number;
  onClick: () => void;
}

export const CustomButton: Component<IButton> = ({ width, height, title, mt, onClick }) => {
  return <Button
    width={width}
    height={height}
    borderRadius={8}
    backgroundColor={'#3369F3'}
    color={'#E2E2E4'}
    marginTop={mt}
    fontWeight={'500'}
    onClick={onClick}
  >{title}</Button>;
}
