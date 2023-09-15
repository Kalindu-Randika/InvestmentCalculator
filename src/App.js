import {React , useState} from 'react'; // Import React if not already imported
import logo from './assets/investment-calculator-logo.png';
import CalculateForm from "./CalculateForm";

function App() {

    const [yearlyData, setYearlyData] = useState([]); // State to store the yearly data

    // Callback function to receive yearlyData from the child component
    const receiveYearlyData = (data) => {
        setYearlyData(data);
    };

  return (
      <div>
        <CalculateForm onYearlyDataChange={receiveYearlyData} />

        {/* Display the yearly data */}
        {yearlyData.length > 0 && (
            <table className="result">
              <thead>
              <tr>
                <th>Year</th>
                <th>Total Savings</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
              </tr>
              </thead>
              <tbody>
              {yearlyData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.year}</td>
                    <td>${data.savingsEndOfYear}</td>
                    <td>${data.yearlyInterest}</td>
                    <td>${(data.year * data.yearlyInterest).toFixed(2)}</td>
                    <td>${(data.year * data.yearlyContribution).toFixed(2)}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}
      </div>
  );
}

export default App;
