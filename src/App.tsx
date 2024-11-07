import { LeaseProvider } from './context/LeaseContext';
import CalculatorPage from './pages/CalculatorPage';

const App = () => (
  <LeaseProvider>
    <CalculatorPage />
  </LeaseProvider>
);

export default App;