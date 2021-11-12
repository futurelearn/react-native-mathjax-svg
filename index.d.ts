import { ReactElement } from "react";
import { XmlProps } from "react-native-svg";

export type MathJaxProps = Omit<XmlProps, "xml"> & {
  color?: string;
  fontSize?: number;
  children?: string;
  inputFormat?: "Tex" | "MathML";
};

export default function MathJax(props: MathJaxProps): ReactElement;
