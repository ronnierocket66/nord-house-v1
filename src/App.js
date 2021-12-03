import logo from './logo.svg';
//import './App.css';
import Table from './Table.js'
import tw from "twin.macro"

const AppContainer = tw.div`
w-full
max-w-full
flex
flex-col
items-center
justify-center
pt-6
pb-10
pl-10
pr-10
`;

const Title = tw.h1`
text-2xl
font-semibold
`


function App() {
  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default App;
