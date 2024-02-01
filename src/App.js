import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './style.css'

import api from './services/api'

function App() {
  
  const [input,  setInput] = useState ('')
  const [cep, setCep] =  useState({});


  async function handleSearch()  {
    // 05138180/json/

    if(input  === '') {
      alert("Prencha algum CEP")
      return;
    }
    try {
      const response = await api.get(`${input}/json/`)
      setCep(response.data)
      setInput('');
    }catch {
      alert("Ops... Erro ao buscar aqui")
      setInput('');
    }

    // explicação de try e catch
    //https://www.dio.me/articles/tratamento-de-excecoes-em-javascript-utilizando-try-catch-e-finally

  }
  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP..." value={input} onChange={(e) => setInput(e.target.value)}/>

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff'/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && /* só vai ser excutado se tiver valor de length*/(
      <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )};    
    </div>
  );
}

export default App;
