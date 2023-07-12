import React from 'react';
import { MathJax,MathJaxContext } from "better-react-mathjax";
import 'bootstrap/dist/css/bootstrap.min.css';

const SymbolButton = ({ label, symbol }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(symbol);
    alert('copied!');
  };

  return (
    <button className="btn btn-outline-primary m-1" onClick={handleCopy}>
      <MathJax>{"\\("+label+"\\)"}</MathJax>
    </button>
  );
};

const LatexSymbolsContainer = () => {
  var [symbols, setSymbols] = React.useState([]);

  React.useEffect(() => {
    const fetchLatexFile = async () => {
      try {
        const response = await fetch('./latex_commands.txt'); // 替换为文本文件的路径
        const text = await response.text();
        symbols = text.split('\n')
        // console.log(symbols);
        setSymbols(symbols);

      } catch (error) {
        console.error('Error fetching LaTeX file:', error);
      }
    };
    fetchLatexFile();
  }, []);

  return (
    <div>
    {symbols.map((symbol, index) => (
      <SymbolButton key={index} label={symbol} symbol={symbol} />
    ))}
    </div>
  );
}

const Title = () => {
  return (
    <div className="container p-2">
      <h1 className="text-center">
        Latex Symbol Palette
      </h1>
      <h5 className="text-center">
        Made by Icer, my Github: <a href="https://github.com/joshtu0627">link</a>
      </h5>
      <h5 className="text-center">
        Copy by clicking it :)
      </h5>
    </div>
  );
};

const Reference = () => {
  return (
    <div className="container p-4 text-center">
      <h5>
        Symbol source: 
        <a href="https://www.bearnok.com/grva/it/knowledge/software/mathjax"> link</a>
      </h5>
    </div>
  );
}

const App = () => {
  return (
    <MathJaxContext>
      <div className='App'>
        <Title />
        <div className='container p-4'>
          <div className="col d-flex justify-content-center">
            <LatexSymbolsContainer />
          </div>
        </div>
        <Reference/>
      </div>
    </MathJaxContext>
  );
};

export default App;
