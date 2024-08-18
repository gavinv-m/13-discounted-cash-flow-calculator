# Discounted Cash Flow Calculator

## Project Description

The Discounted Cash Flow Calculator (DCCF) is a tool designed to help investors and financial analysts estimate the intrinsic value of a company based on its expected future cash flows. By discounting these future cash flows to their present value, the calculator provides a clearer picture of a company's potential worth, aiding in making informed investment decisions.

This project aims to simplify the DCF calculation process, making it accessible to both beginners and experienced professionals. This calculator supports customization of discount rates, growth rates, and tax rates, providing flexibility to accommodate various financial models.

## Installation

To get started with the Discounted Cash Flow Calculator (DCCF), follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:gavinv-m/13-discounted-cash-flow-calculator.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd 13-discounted-cash-flow-calculator
   ```
3. **Install Dependencies:**
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

4. **Start the Application:**
   ```bash
   npm run start
   ```

This will set up the project on your local machine and start the development server.

## Usage

Once the Discounted Cash Flow Calculator (DCCF) is installed and running, you can use it as follows:

1. **Access the Application:**
   Open your web browser and navigate to `http://localhost:8080`.

2. **Initial Load:**

   - The application loads with IBM as the default company.
   - The sidebar displays key metrics such as Revenue, Weighted Average Cost of Capital (WACC), Long-Term Growth Rate, and Tax Rate. These fields are pre-populated with IBM's current data.

3. **Adjust Metrics:**

   - You can adjust the metrics in the sidebar to see how changes impact IBM's valuation.
   - After making adjustments, the DCF will recalculate and provide a new intrinsic value.
   - A valuation statement will indicate whether IBM is currently overvalued or undervalued based on your inputs.

4. **Search for Another Company:**

   - Use the input section in the main area to search for another company by its symbol.
   - Upon entering a new symbol, the inputs will automatically populate with that company's data.

5. **Customize and Recalculate:**
   - Adjust any of the metrics for the newly selected company.

Explore different companies and scenarios by modifying inputs to understand how various factors influence their DCF valuation.

## Version History

### 1.0.0

- Initial release with basic functionality.
- Default loading with IBM and basic metrics calculation.
- Added company search and input adjustments for valuation.
