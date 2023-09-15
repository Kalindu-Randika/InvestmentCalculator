import React, { useState } from 'react';
import logo from './assets/investment-calculator-logo.png';

function CalculateForm({ onYearlyDataChange }) {
    const [currentSavings, setCurrentSavings] = useState('');
    const [yearlyContribution, setYearlyContribution] = useState('');
    const [expectedReturn, setExpectedReturn] = useState('');
    const [duration, setDuration] = useState('');

    const resetHandler = () => {
        setCurrentSavings('');
        setYearlyContribution('');
        setExpectedReturn('');
        setDuration('');
        onYearlyDataChange([]); // Clear the yearly data in the parent component
    };

    const calculateHandler = (event) => {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page

        // Convert input values to numbers
        const currentSavingsValue = parseFloat(currentSavings);
        const yearlyContributionValue = parseFloat(yearlyContribution);
        const expectedReturnValue = parseFloat(expectedReturn) / 100;
        const durationValue = parseFloat(duration);

        const calculatedYearlyData = []; // Temporary array to hold yearly data

        // Calculate yearly results
        let currentYearlySavings = currentSavingsValue;

        for (let i = 0; i < durationValue; i++) {
            const yearlyInterest = currentYearlySavings * expectedReturnValue;
            currentYearlySavings += yearlyInterest + yearlyContributionValue;

            calculatedYearlyData.push({
                year: i + 1,
                yearlyInterest: yearlyInterest.toFixed(2), // Format to two decimal places
                savingsEndOfYear: currentYearlySavings.toFixed(2), // Format to two decimal places
                yearlyContribution: yearlyContributionValue.toFixed(2), // Format to two decimal places
            });
        }

        // Call the callback to send the calculated data to the parent component
        onYearlyDataChange(calculatedYearlyData);
    };

    return (
        <div>
            <header className="header">
                <img src={logo} alt="logo" />
                <h1>Investment Calculator by K 👀 </h1>
            </header>

            <form className="form" onSubmit={calculateHandler}>
                <div className="input-group">
                    <p>
                        <label htmlFor="current-savings">Current Savings ($)</label>
                        <input
                            type="number"
                            id="current-savings"
                            value={currentSavings}
                            onChange={(e) => setCurrentSavings(e.target.value)}
                        />
                    </p>
                    <p>
                        <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                        <input
                            type="number"
                            id="yearly-contribution"
                            value={yearlyContribution}
                            onChange={(e) => setYearlyContribution(e.target.value)}
                        />
                    </p>
                </div>
                <div className="input-group">
                    <p>
                        <label htmlFor="expected-return">Expected Interest (%, per year)</label>
                        <input
                            type="number"
                            id="expected-return"
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(e.target.value)}
                        />
                    </p>
                    <p>
                        <label htmlFor="duration">Investment Duration (years)</label>
                        <input
                            type="number"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </p>
                </div>
                <p className="actions">
                    <button type="button" className="buttonAlt" onClick={resetHandler}>
                        Reset
                    </button>
                    <button type="submit" className="button">
                        Calculate
                    </button>
                </p>
            </form>
        </div>
    );
}

export default CalculateForm;
