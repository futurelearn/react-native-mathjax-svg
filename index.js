import React from "react";
import { SvgFromXml } from "react-native-svg";

const mathjax = require("./mathjax/es5/js/mathjax.js").mathjax;
const TeX = require("./mathjax/es5/js/input/tex.js").TeX;
const MathML = require("./mathjax/es5/js/input/mathml.js").MathML;
const SVG = require("./mathjax/es5/js/output/svg.js").SVG;
const liteAdaptor =
  require("./mathjax/es5/js/adaptors/liteAdaptor.js").liteAdaptor;
const RegisterHTMLHandler =
  require("./mathjax/es5/js/handlers/html.js").RegisterHTMLHandler;
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const AllPackages =
  require("./mathjax/es5/js/input/tex/AllPackages").AllPackages;

const TexFormat = "Tex";
const MathMLFormat = "MathML";

const params = {
  ex: 8,
  em: 16,
  width: 80,
  inline: true,
  packages: AllPackages.sort().join(", "),
  fontCache: true,
};

const getScale = (_svgString) => {
  const svgString = _svgString.match(/<svg([^\>]+)>/gi).join("");

  let [width, height] = (svgString || "")
    .replace(
      /.* width=\"([\d\.]*)[ep]x\".*height=\"([\d\.]*)[ep]x\".*/gi,
      "$1,$2"
    )
    .split(/\,/gi);
  [width, height] = [parseFloat(width), parseFloat(height)];
  return [width, height];
};

const applyScale = (svgString, [width, height]) => {
  let retSvgString = svgString.replace(
    /(<svg[^\>]+height=\")([\d\.]+)([ep]x\"[^\>]+>)/gi,
    `$1${height}$3`
  );
  retSvgString = retSvgString.replace(
    /(<svg[^\>]+width=\")([\d\.]+)([ep]x\"[^\>]+>)/gi,
    `$1${width}$3`
  );
  return retSvgString;
};

const applyColor = (svgString, fillColor) => {
  return svgString.replace(/currentColor/gim, `${fillColor}`);
};

const buildInputJax = (inputFormat) => {
  if (inputFormat === MathMLFormat) return new MathML();
  if (inputFormat === TexFormat)
    return new TeX({ packages: params.packages.split(/\s*,\s*/) });

  throw new Error("Unsupported inputFormat");
};

const convertToSvg = (text = "", fontSize = 8, inputFormat = "Tex") => {
  if (!text) {
    return "";
  }

  const svg = new SVG({ fontCache: params.fontCache ? "local" : "none" });
  const html = mathjax.document("", {
    InputJax: buildInputJax(inputFormat),
    OutputJax: svg,
  });
  const node = html.convert(text, {
    display: true,
    em: params.em,
    ex: params.ex,
  });

  let svgString = adaptor.outerHTML(node) || "";
  svgString = svgString.replace(
    /\<mjx-container.*?\>(.*)\<\/mjx-container\>/gi,
    "$1"
  );

  const [width, height] = getScale(svgString);
  svgString = applyScale(svgString, [width * fontSize, height * fontSize]);

  return `${svgString}`;
};

const MathJax = (props) => {
  const text = props.children || "";
  const fontSize = props.fontSize ? props.fontSize / 2 : undefined;
  const inputFormat = props.inputFormat || TexFormat;
  let svgXml = convertToSvg(text, fontSize, inputFormat);
  svgXml = applyColor(svgXml, props.color ? props.color : "black");
  return <SvgFromXml xml={svgXml} {...props} />;
};

export default MathJax;
export { texToSvg };
