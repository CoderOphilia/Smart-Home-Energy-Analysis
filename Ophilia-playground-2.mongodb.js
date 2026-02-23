// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("test");
// Q1
    db.testData.aggregate([
        // Only keep rows where unit is kWh
        {
          $match: {
            "tariff.unit": "kWh"
          }
        },
      
        // Group by month + city
        {
          $group: {
            _id: {
              city: "$home.city",
              month: "$Date.month"
            },
            total_kWh: { $sum: "$fact.usage_amount" },
            total_bill: { $sum: "$fact.cost_cad" }
          }
        },
      
        // Sort by city then month
        {
          $sort: {
            "total_kWh": -1,
            "total_bill": -1
          }
        }
      ])

// Q2
      db.testData.aggregate([
        //  Filter for peak-hour records AND only kWh unit
        {
          $match: {
            "fact.is_peak": true,
            "tariff.unit": "kWh"        
          }
        },
      
        // Group by device category and sum usage
        {
          $group: {
            _id: "$device.category",    
            total_kWh: {                
              $sum: "$fact.usage_amount"
            }
          }
        },
      
        // Sort results from highest kWh to lowest
        {
          $sort: { total_kWh: -1 }
        }
      ])



// Find a document in a collection.
db.getCollection("testData").findOne({

});

db.testData.find(
    {},
    {home:1, _id:0}
)

db.testData.findOne(
  {}, 
  { Date: 1, _id: 0 } // Show ONLY the Date field
);

db.testData.distinct("home.dwelling_type");

//------Query 3: Average Daily kWh per Capita by Dwelling Type ------
db.testData.aggregate([
    // 1. MATCH: Filter for valid data
    { 
        $match: { "fact.usage_amount": { $exists: true } } 
    },

    // 2. GROUP: Summarize usage to the "Daily" level
    {
        $group: {
            _id: {
                type: "$home.dwelling_type",
                home_id: "$home.id",
                day: { 
                    $dateToString: {  
                        date: { $toDate: "$Date.full_date" } 
                    } 
                }
            },
            daily_usage: { $sum: "$fact.usage_amount" },
            occupants: { $first: "$home.occupants" }
        }
    },

    // 3. GROUP: Average by Dwelling Type
    {
        $group: {
            _id: "$_id.type",
            avg_daily_kwh_per_capita: {
                $avg: { $divide: ["$daily_usage", "$occupants"] }
            }
        }
    },

    // 4. SORT: Highest usage to lowest
    { 
        $sort: { avg_daily_kwh_per_capita: -1 } 
    }
]);

//--------Query 4: Night “Standby” Consumption by Room Type--------

db.testData.find(
  {}, 
  { device: 1, Time: 1, _id: 0 } // Show only Device and Time info
);


db.testData.aggregate([
  // 1. MATCH: Filter for Nighttime records
  {
    $match: {
      "Time.time_of_day": "night" 
    }
  },

  // 2. GROUP: Group by Room and calculate average usage
  {
    $group: {
      _id: "$device.room", 
      avg_standby_consumption: { $avg: "$fact.usage_amount" }
    }
  },

  // 3. SORT: Highest consumption first
  {
    $sort: { avg_standby_consumption: -1 }
  }
]);


//------Query 5: Seasonal Change by Tariff Plan---------- 
db.testData.distinct("tariff.utility_type");
db.testData.find(
  {}, 
  { tariff: 1, _id: 0 }
);
db.testData.distinct("Date.season");

//------viewing seasonal change and energy consumption------
db.testData.aggregate([
  // 1. MATCH: Filter for valid usage data
  {
    $match: {
      "fact.usage_amount": { $exists: true }
    }
  },

  // 2. GROUP: Group by Utility, Flag (Plan), and Season
  {
    $group: {
      _id: {
        utility: "$tariff.utility_type", 
        season: "$Date.season"
      },
      avg_usage: { $avg: "$fact.usage_amount" }
    }
  },

  // 3. SORT: Organize the results
  {
    $sort: { 
      avg_usage: -1
    }
  }
]);

//---viewing plan change----
db.testData.aggregate([
  // 1. MATCH: Filter for valid usage data
  {
    $match: {
      "fact.usage_amount": { $exists: true }
    }
  },

  // 2. GROUP: Group by Utility, Flag (Plan), and Season
  {
    $group: {
      _id: {
        utility: "$tariff.utility_type", 
        is_variable_plan: "$tariff.hours_flag", 
        season: "$Date.season"
      },
      avg_usage: { $avg: "$fact.usage_amount" }
    }
  },

  // 3. SORT: Organize the results
  {
    $sort: { 
      avg_usage: -1
    }
  }
]);