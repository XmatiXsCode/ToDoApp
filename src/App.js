import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
let editingMode = false, once;

function App() {
  const [zadania, ustawZadania] = useState([[], "", ""]);
  const dodajZadanie = () => {
    if(!editingMode)
    {
      if(zadania[1].trim() === "") return;
      ustawZadania([[...zadania[0], {id: Date.now(), text: zadania[1], isInEdit: false}], "", ""]);
    }
  }
  const usunZadanie = (zadanieID) => {
    if(!editingMode) ustawZadania([[...zadania[0].filter(zadanie => zadanie.id !== zadanieID)], zadania[1], zadania[2]]);
  }
  const edytujZadanie = (zadanieID) => {
    once = 0;
    if(!editingMode)
    {
      zadania[0].map((zadanie) => {
        if(zadanie.id == zadanieID)
        if(once == 0)
        {
          zadanie.isInEdit = true;
          zadania[2] = zadanie.text;
          once = 1;
        } 
      });
      editingMode = true;
      ustawZadania([[...zadania[0]], zadania[1], zadania[2]]);
    }
  }
  const aktualizujZadanie = (zadanieID) => {
    once = 0;
    zadania[0].map((zadanie) => {
      if(zadanie.id == zadanieID)
      if(once == 0)
      {
        zadanie.isInEdit = false;
        zadanie.text = zadania[2];
        once = 1;
      } 
    });
    editingMode = false;
    ustawZadania([[...zadania[0]], zadania[1], zadania[2]]);
  }
  return (
    <div>
      <h1>Lista zadań</h1>
      <input type="text" value={zadania[1]} onChange={(e) => ustawZadania([[...zadania[0]], e.target.value, zadania[2]])}></input>
      <button onClick={dodajZadanie}>Dodaj</button>
      <ol>
        {zadania[0].map((zadanie) => (
        zadanie.isInEdit == true
        ? <li><input type="text" value={zadania[2]} onChange={(e) => ustawZadania([[...zadania[0]], zadania[1], e.target.value])}></input> <button onClick={(e) => aktualizujZadanie(zadanie.id)}>✏️</button></li>
        : <li>{zadanie.text} <button onClick={() => edytujZadanie(zadanie.id)}>✏️</button> <button onClick={() => usunZadanie(zadanie.id)}>❌</button></li>
        ))}
      </ol>
    </div>
  );
}

export default App;