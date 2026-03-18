import { Header } from "./components/Header/Header";
import { Board } from "./components/Board/Board";
import { useBoard } from "./hooks/useBoard";
import "./index.css";

function App() {
  const { state, addCard, editCard, deleteCard, moveCard } = useBoard();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-blue-50">
      <Header onAdd={addCard} onEdit={editCard} />
      <main className="flex-1 overflow-x-auto">
        <Board
          cards={state.cards}
          onAdd={addCard}
          onEdit={editCard}
          onDelete={deleteCard}
          onMove={moveCard}
        />
      </main>
    </div>
  );
}

export default App;
