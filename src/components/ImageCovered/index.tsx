import { Theme } from "@emotion/react";
import { ElementType, ClassAttributes, ImgHTMLAttributes } from "react";
import { Img } from "./style";

export const ImageCovered = (
  props: JSX.IntrinsicAttributes & {
    theme?: Theme | undefined;
    as?: ElementType<any> | undefined;
  } & ClassAttributes<HTMLImageElement> &
    ImgHTMLAttributes<HTMLImageElement>
) => {
  return <Img {...props} />;
};
