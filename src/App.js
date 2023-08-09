import React, { useState, useEffect, useMemo, useCallback } from "react";
import './estilo.css';

function App() {

  const [input, setInput] = useState("");
  const [tarefas, setTarefas] = useState([]);


 
  useEffect(() => {
    const tarefasStorage = localStorage.getItem("tarefas");
    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage)); 
    }
  }, [])

 
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas])


  const handleAdd = useCallback(() => {
    setTarefas([...tarefas, input]);
    setInput("");
  }, [tarefas, input])


  const handleDelete = (index) => {
    const newTarefas = [...tarefas];
    newTarefas.splice(index, 1)
    setTarefas(newTarefas);
  };

  const totalTarefas = useMemo(() => tarefas.length, [tarefas]);

  return (
    <div className="container">
      <ul>
        {tarefas.map((tarefas, index) =>
          <li key={tarefas} className="listaTarfas">{tarefas}
            <button onClick={() => handleDelete(index)} className="btnExcluir" >X</button>
          </li>)}

      </ul>
      <br />

      <strong>Você tem {totalTarefas} Tarefas!</strong><br />

      <input type="text" value={input} onChange={e => setInput(e.target.value)} className="input" /> {/*Quando queremos alterar o valor do state contador nós usamos o setInput*/}
      <button type="button" onClick={handleAdd} className="btnAdicionar">Adicionar</button>

    </div>
  )
}

export default App;