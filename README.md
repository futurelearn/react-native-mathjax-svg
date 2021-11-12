# React Native component to display Latex/MathML using MathJax without WebView

## Installation
```
$ yarn add react-native-mathjax-svg react-native-svg
```

## Usage
```
import MathJax from 'react-native-mathjax-svg';

...

<MathJax
  fontSize={16}
  color={'red'}
  >
  4sen(α)cos^2(α/2)
</MathJax>
```

|  Props name   | Default value  | Description                             |
| ------------- | -------------- | --------------------------------------- |
|  fontSize     | 16             | Size of font to display formula         |
|  color        | 'black'        | Color of formula to display             |
|  inputFormat  | 'Tex'          | Supported formats ('Tex' and 'MathML')  |


## Example
[https://github.com/railsjack/demo-app-for-mathjax](https://github.com/railsjack/demo-app-for-mathjax)
