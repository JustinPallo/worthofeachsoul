document.addEventListener('DOMContentLoaded', () => {

    // Get elements
    const form = document.getElementById('calculator-form');
    const resultsContainer = document.getElementById('results');

    // Output elements
    const totalTithingEl = document.getElementById('total-tithing');
    const totalFastOfferingsEl = document.getElementById('total-fast-offerings');
    const totalMissionEl = document.getElementById('total-mission');
    const grandTotalEl = document.getElementById('grand-total');

    // --- Constants ---
    const TITHING_RATE = 0.10;
    // Estimated average cost of a mission (can be adjusted)
    const MISSION_COST = 12000; 

    // Listen for form submission
    form.addEventListener('submit', (e) => {
        // Prevent the form from reloading the page
        e.preventDefault(); 
        
        // --- Get Input Values ---
        const currentAge = parseInt(document.getElementById('current-age').value);
        const retirementAge = parseInt(document.getElementById('retirement-age').value);
        const annualIncome = parseFloat(document.getElementById('annual-income').value);
        const fastOffering = parseFloat(document.getElementById('fast-offering').value);
        const didMission = document.getElementById('mission').checked;

        // --- Validation ---
        if (isNaN(currentAge) || isNaN(retirementAge) || isNaN(annualIncome) || isNaN(fastOffering)) {
            alert("Please fill out all fields with valid numbers.");
            return;
        }

        if (retirementAge <= currentAge) {
            alert("Retirement age must be greater than your current age.");
            return;
        }

        // --- Calculations ---
        const yearsOfContribution = retirementAge - currentAge;

        const totalTithing = annualIncome * TITHING_RATE * yearsOfContribution;
        const totalFastOfferings = fastOffering * 12 * yearsOfContribution;
        const totalMission = didMission ? MISSION_COST : 0;

        const grandTotal = totalTithing + totalFastOfferings + totalMission;

        // --- Display Results ---
        totalTithingEl.innerText = formatCurrency(totalTithing);
        totalFastOfferingsEl.innerText = formatCurrency(totalFastOfferings);
        totalMissionEl.innerText = formatCurrency(totalMission);
        grandTotalEl.innerText = formatCurrency(grandTotal);

        // Show the results container
        resultsContainer.style.display = 'block';
    });

    /**
     * Helper function to format a number as US currency
     * @param {number} num - The number to format
     * @returns {string} - The formatted currency string
     */
    function formatCurrency(num) {
        return '$' + num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

});
