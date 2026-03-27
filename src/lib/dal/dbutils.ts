import * as sql from "mssql";
import { pool } from '@/lib/db';



interface SqlParameter {
  value?: any;
  type?: any;
  options?: any;
}

function isSqlParameter(value: unknown): value is SqlParameter {
  return (
    typeof value === "object" &&
    value !== null &&
    ("value" in value || "type" in value || "options" in value)
  );
}


export async function executeStoredProcedure(procedureName: any, params = {}) {
   const db = await pool(); // Singleton pool
  const request = db.request();

  // Add all parameters
  Object.entries(params).forEach(([name, value]) => {
    const paramConfig = {
      name,
      value: isSqlParameter(value) ? value.value : value,
      type: isSqlParameter(value) ? value.type : sql.NVarChar,
      options: isSqlParameter(value) ? value.options : {},
    };
    request.input(name, paramConfig.type, paramConfig.value);
  });

  return await request.execute(procedureName);
}

