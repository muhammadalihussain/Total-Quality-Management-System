import sql from 'mssql';

const config :any = {
  user: "ali",
  password: "m@tco123",
  server: "192.168.11.24\\DBSVR",
  database: "TQMS",
  multipleStatements: true,

  driver: "tedious",
  connectionLimit: 500,
  pool: {
    max: 500,
    min: 0,
    idleTimeoutMillis: 30000,
  },

  options: {
    encrypt: false,
    trustedconnection: true,
    enableArithAbort: true,
    cryptoCredentialsDetails: {
      minVersion: "TLSv1",
    },
  },
  requestTimeout: 2500000,
};





// Singleton pool instance
let poolPromise :any = null;

export const pool = async () => {
  if (!poolPromise) {
    poolPromise = sql.connect(config)
      .then((pool) => {
       // console.log('Connected to MSSQL ');
        return pool;
      })
      .catch((err) => {
        poolPromise = null; // reset if connection failed
      //  console.error('DB Connection Error ', err);
        throw err;
      });
  }
  return poolPromise;
};



