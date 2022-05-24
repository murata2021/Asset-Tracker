const Sequelize = require("sequelize");
const config = require("config");

require("pg").defaults.parseInt8 = true;

const dbConfig = config.get("database");

let sequelize;
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    ssl: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      dialect: dbConfig.dialect,
      logging: dbConfig.logging,
    }
  );
}

console.log(sequelize);
const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

authenticate();

module.exports = sequelize;
