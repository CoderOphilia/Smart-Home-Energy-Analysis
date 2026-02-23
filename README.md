# Smart Home Energy Consumption: OLAP Analysis in MongoDB

##  Project Overview
This project analyzes energy consumption—specifically electricity, gas, and water—across smart homes, devices, and varying temporal dimensions. The primary objective was to execute OLAP-style business intelligence queries using a document-based NoSQL database (MongoDB) to uncover actionable insights regarding peak demand, standby energy sinks, and seasonal trends

##  Tools & Technologies
**Database Engine:** MongoDB 
***Data Modeling:** MySQL Workbench (Initial Star Schema Design)
**Development Environment:** Visual Studio Code with MongoDB Extension (NoSQL aggregation pipelines)
**Data Generation:** Mockaroo (Synthetic JSON dataset generation)

##  ETL & Data Architecture (7Ws Dimensional Model)
The database architecture was initially conceptualized as a Star Schema in MySQL before being transformed and denormalized into a document model optimized for MongoDB. 

**Dimension Attributes & Facts:**
**DIM_HOME:** City, region, dwelling type, square footage, and occupant count to analyze usage against home size.
**DIM_DEVICE:** Category, room, and brand to enable cross-device efficiency comparisons.
**DIM_TARIFF:** Utility unit, rate per kWh, and peak-hour flags for cost analysis.
**DIM_DATE & DIM_TIME:** Granular temporal data (month, season, time-of-day) for pattern tracking.
**DIM_WEATHER:** Temperature and humidity codes to correlate usage with environmental factors.
**FACT_ENERGYUSAGE:** The central node linking usage amounts, costs, and peak-hour flags to all dimensions.

*Data Loading Process:* Due to the time-consuming nature of large JSON insertions, the data entry process was segmented into smaller, controlled batches to ensure accurate data validation and integrity during the load phase.

---
*ERD Diagram*
<img width="2367" height="1422" alt="image" src="https://github.com/user-attachments/assets/2aa916cc-02b0-4ebf-b37e-037195383ef6" />

---
*MongoDB Connection*
<img width="2264" height="1480" alt="image" src="https://github.com/user-attachments/assets/e5010745-a1f6-457e-b926-03bf2a06148b" />




## Key Aggregation Queries & Business Insights

**1. Monthly Total kWh and Financial Impact by City**
**Finding:** Honolulu consumed approximately 17% more electricity than South Bend, yet generated a total bill nearly 14 times higher.
* **Insight:** This discrepancy is driven by regional tariff rates; Honolulu's average cost per kWh is ~1.34 CAD compared to South Bend's ~0.11 CAD. 

**2. Peak-Hour kWh Share by Device Category**
**Finding:** The "Appliance" category is the primary driver of peak-hour consumption, utilizing roughly 4,000 kWh. 
**Insight:** Appliances consume significantly more energy during peak hours than Lighting and HVAC combined, highlighting a key target area for demand-side grid management.

**3. Daily Per-Capita kWh by Dwelling Type**
**Finding:** Townhouses proved to be the most energy-efficient dwelling type, averaging 34.9 kWh per person dail. Condos and single-family houses demonstrated surprisingly similar, higher usage levels.

**4. Nighttime "Standby" Consumption by Room**
**Finding:** Kitchens are the highest source of nighttime "standby" energy due to always-on cycling appliances like refrigerators.
**Insight:** Bedrooms ranked second (averaging 53.2 units), likely driven by overnight device charging and temperature control systems.

**5. Seasonal Behavioral Changes by Tariff Plan**
**Finding:** Water usage peaks in Winter (alongside Gas), while Electricity demand peaks in Autumn.
**Insight:** Customers enrolled in Variable Plans maintain flatter, more efficient energy profiles. Conversely, Fixed Plan customers exhibit extreme seasonal usage spikes, indicating that without the financial incentive of "peak pricing," there is less motivation to conserve resources.

## Conclusion & Potential Applications
The project successfully demonstrated that complex, OLAP-style analytics can run efficiently on MongoDB using a Fact-Dimension inspired document design. he findings from these pipelines can be directly utilized to design better tariff structures and provide targeted energy-saving recommendations to consumers.


