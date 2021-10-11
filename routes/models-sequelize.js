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
      unique: true,
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
    clientnumber: {
      type: Sequelize.STRING,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['clientnumber'],
      },
    ],
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
    drivernumber: {
      type: Sequelize.STRING,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    indexes: [
      // Create a unique index
      {
        unique: true,
        fields: ['drivernumber', 'license_plate'],
      },
    ],
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
      unique: true,
    },
    client_id: {
      type: Sequelize.INTEGER(6),
      references: {
        model: client,
        key: 'id',
      },
    },
    driver_id: {
      type: Sequelize.INTEGER(6),
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
      type: Sequelize.INTEGER(6),
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
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
      unique: true,
    },
    ride_id: {
      type: Sequelize.INTEGER(11),
      references: {
        model: ride,
        key: 'id',
      },
    },
    number: {
      type: Sequelize.INTEGER(11),
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

// view ride_list model
const ride_list = sequelize.define(
  'ride_list',
  {
    cust_firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cust_surname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ride_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    driv_firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    driv_surname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    driv_firstname: {
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
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    distance: {
      type: Sequelize.INTEGER(6),
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

// view statistic model
const statistic = sequelize.define(
  'statistic',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    city: {
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

module.exports = {
  client,
  driver,
  ride,
  waypoint,
  ride_list,
  statistic,
};
