# Smart Home Energy Consumption: OLAP Analysis in MongoDB

## 📌 Project Overview
[cite_start]This project analyzes energy consumption—specifically electricity, gas, and water—across smart homes, devices, and varying temporal dimensions[cite: 7, 8]. [cite_start]The primary objective was to execute OLAP-style business intelligence queries using a document-based NoSQL database (MongoDB) to uncover actionable insights regarding peak demand, standby energy sinks, and seasonal trends[cite: 11, 108, 111]. 

## 🛠️ Tools & Technologies
* [cite_start]**Database Engine:** MongoDB [cite: 10]
* [cite_start]**Data Modeling:** MySQL Workbench (Initial Star Schema Design) [cite: 98]
* [cite_start]**Development Environment:** Visual Studio Code with MongoDB Extension (NoSQL aggregation pipelines) [cite: 100]
* [cite_start]**Data Generation:** Mockaroo (Synthetic JSON dataset generation) [cite: 60, 99]

## 🗄️ ETL & Data Architecture (7Ws Dimensional Model)
[cite_start]The database architecture was initially conceptualized as a Star Schema in MySQL before being transformed and denormalized into a document model optimized for MongoDB[cite: 10, 48, 109]. 

**Dimension Attributes & Facts:**
* [cite_start]**DIM_HOME:** City, region, dwelling type, square footage, and occupant count to analyze usage against home size[cite: 46, 47].
* [cite_start]**DIM_DEVICE:** Category, room, and brand to enable cross-device efficiency comparisons[cite: 49, 50].
* [cite_start]**DIM_TARIFF:** Utility unit, rate per kWh, and peak-hour flags for cost analysis[cite: 51, 52].
* [cite_start]**DIM_DATE & DIM_TIME:** Granular temporal data (month, season, time-of-day) for pattern tracking[cite: 53, 54].
* [cite_start]**DIM_WEATHER:** Temperature and humidity codes to correlate usage with environmental factors[cite: 55, 56].
* [cite_start]**FACT_ENERGYUSAGE:** The central node linking usage amounts, costs, and peak-hour flags to all dimensions[cite: 57, 58].

[cite_start]*Data Loading Process:* Due to the time-consuming nature of large JSON insertions, the data entry process was segmented into smaller, controlled batches to ensure accurate data validation and integrity during the load phase[cite: 104, 105].

## 📊 Key Aggregation Queries & Business Insights

**1. Monthly Total kWh and Financial Impact by City**
* [cite_start]**Finding:** Honolulu consumed approximately 17% more electricity than South Bend, yet generated a total bill nearly 14 times higher[cite: 68, 71].
* **Insight:** This discrepancy is driven by regional tariff rates; [cite_start]Honolulu's average cost per kWh is ~1.34 CAD compared to South Bend's ~0.11 CAD[cite: 72]. 

**2. Peak-Hour kWh Share by Device Category**
* [cite_start]**Finding:** The "Appliance" category is the primary driver of peak-hour consumption, utilizing roughly 4,000 kWh[cite: 74, 75]. 
* [cite_start]**Insight:** Appliances consume significantly more energy during peak hours than Lighting and HVAC combined, highlighting a key target area for demand-side grid management[cite: 76, 78].

**3. Daily Per-Capita kWh by Dwelling Type**
* [cite_start]**Finding:** Townhouses proved to be the most energy-efficient dwelling type, averaging 34.9 kWh per person daily[cite: 79, 80]. [cite_start]Condos and single-family houses demonstrated surprisingly similar, higher usage levels[cite: 81].

**4. Nighttime "Standby" Consumption by Room**
* [cite_start]**Finding:** Kitchens are the highest source of nighttime "standby" energy due to always-on cycling appliances like refrigerators[cite: 84, 85].
* [cite_start]**Insight:** Bedrooms ranked second (averaging 53.2 units), likely driven by overnight device charging and temperature control systems[cite: 86].

**5. Seasonal Behavioral Changes by Tariff Plan**
* [cite_start]**Finding:** Water usage peaks in Winter (alongside Gas), while Electricity demand peaks in Autumn[cite: 90, 91].
* [cite_start]**Insight:** Customers enrolled in Variable Plans maintain flatter, more efficient energy profiles[cite: 95]. [cite_start]Conversely, Fixed Plan customers exhibit extreme seasonal usage spikes, indicating that without the financial incentive of "peak pricing," there is less motivation to conserve resources[cite: 96].

## 💡 Conclusion & Potential Applications
[cite_start]The project successfully demonstrated that complex, OLAP-style analytics can run efficiently on MongoDB using a Fact-Dimension inspired document design[cite: 108]. [cite_start]The findings from these pipelines can be directly utilized to design better tariff structures and provide targeted energy-saving recommendations to consumers[cite: 112].

---
[cite_start]*Project Contributors: Ophilia, Ilke Baskan, Scott Yoon, Khanh* [cite: 1, 3, 4, 5, 6]
