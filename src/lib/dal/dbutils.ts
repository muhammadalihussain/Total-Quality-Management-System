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


export async function executeQueryWithMultipleResults(
    procedureName: string,
    params: { [key: string]: any } = {}
): Promise<any[]> {

   const db = await pool(); // Singleton pool
  const request = db.request();


    Object.keys(params).forEach(key => {
        request.input(key, params[key]);
    });

    const result = await request.execute(procedureName);
    return result.recordsets;
}


export async function executeQuery<T = any>(
    procedureName: string,
    params: { [key: string]: any } = {}
): Promise<T[]> {
    const db = await pool(); // Singleton pool
   const request = db.request();


    // Add parameters
    Object.keys(params).forEach(key => {
        request.input(key, params[key]);
    });

    const result = await request.execute(procedureName);
    return result.recordset as T[];
}


export async function executeNonQuery(
    query: string,
    params: { [key: string]: any } = {}
): Promise<any> {
       const db = await pool(); // Singleton pool
      const request = db.request();


    Object.keys(params).forEach(key => {
        request.input(key, params[key]);
    });

    const result = await request.query(query);
    return result;
}