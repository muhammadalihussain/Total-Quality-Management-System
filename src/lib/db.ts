import sql from 'mssql';

const config :any = {
  user: 'sa',
  password: 'm@tco123',
  server: 'USER\\MSSQLSERVER2016',
  database: 'TQMS',
  options: { encrypt: true, trustServerCertificate: true },
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
        // console.error('DB Connection Error ', err);
        throw err;
      });
  }
  return poolPromise;
};