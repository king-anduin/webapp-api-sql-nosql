// Include Sequelize module.
const Sequelize = require('sequelize');

// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('./connect-rds.js');
// client model
const client = sequelize.define(
  'client',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  }
);

// driver model
const driver = sequelize.define(
  'driver',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    license_plate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  }
);

// ride model
const ride = sequelize.define(
  'ride',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: Sequelize.BIGINT(6),
      references: {
        model: client,
        key: 'id',
      },
    },
    driver_id: {
      type: Sequelize.BIGINT(6),
      references: {
        model: driver,
        key: 'id',
      },
    },
    ride_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    distance: {
      type: Sequelize.BIGINT(6),
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT(2),
      allowNull: false,
    },
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  }
);

// waypoint model
const waypoint = sequelize.define(
  'waypoint',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ride_id: {
      type: Sequelize.BIGINT(11),
      allowNull: false,
    },
    number: {
      type: Sequelize.BIGINT(11),
      allowNull: false,
    },
    latitude: {
      type: Sequelize.FLOAT(11),
      allowNull: false,
    },
    longitude: {
      type: Sequelize.FLOAT(11),
      allowNull: false,
    },
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  }
);

module.exports = {
  client,
  driver,
  ride,
  waypoint,
};
