import Chat from './components/Chat';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;