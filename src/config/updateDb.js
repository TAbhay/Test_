const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');

// Define the database schema
const storeSchema = new mongoose.Schema({
  store_id: String,
  dayOfWeek: Number,
  start_time_local: String,
  end_time_local: String,
  timezone_str: {
    type: String,
    default: 'America/Chicago',
  },
});

const storeStatusSchema = new mongoose.Schema({
  store_id: String,
  timestamp_utc: Date,
  status: String,
});

// Define the database models
const Store = mongoose.model('Store', storeSchema);
const StoreStatus = mongoose.model('StoreStatus', storeStatusSchema);

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read the stores.csv file and update the database
fs.createReadStream('stores.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Parse the data from the CSV file
    const store = {
      store_id: row.store_id,
      dayOfWeek: Number(row.dayOfWeek),
      start_time_local: row.start_time_local,
      end_time_local: row.end_time_local,
    };

    // Save the data to the database
    Store.updateOne({ store_id: store.store_id }, store, {
      upsert: true,
    })
      .then(() => {
        console.log(`Store ${store.store_id} updated successfully`);
      })
      .catch((error) => {
        console.log(`Error updating store ${store.store_id}: ${error}`);
      });
  })
  .on('end', () => {
    console.log('Stores CSV file successfully processed');
  });

// Read the store_status.csv file and update the database
fs.createReadStream('store_status.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Parse the data from the CSV file
    const storeStatus = {
      store_id: row.store_id,
      timestamp_utc: new Date(row.timestamp_utc),
      status: row.status,
    };

    // Save the data to the database
    StoreStatus.create(storeStatus)
      .then(() => {
        console.log(`Store status for ${storeStatus.store_id} saved successfully`);
      })
      .catch((error) => {
        console.log(`Error saving store status for ${storeStatus.store_id}: ${error}`);
      });
  })
  .on('end', () => {
    console.log('Store status CSV file successfully processed');
  });

// Read the store_timezone.csv file and update the database
fs.createReadStream('store_timezone.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Parse the data from the CSV file
    const store = {
      store_id: row.store_id,
      timezone_str: row.timezone_str || 'America/Chicago',
    };

    // Save the data to the database
    Store.updateOne({ store_id: store.store_id }, store, {
      upsert: true,
    })
      .then(() => {
        console.log(`Timezone for store ${store.store_id} saved successfully`);
      })
      .catch((error) => {
        console.log(`Error saving timezone for store ${store.store_id}: ${error}`);
      });
  })
  .on('end', () => {
    console.log('Store timezone CSV file successfully processed');
  });