import * as sql from "mssql";
import { pool } from '@/lib/db';
import { comparePassword } from '@/utils/hash'; // or relative path
import { generateToken } from '@/lib/jwt';


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


async function executeStoredProcedure(procedureName: any, params = {}) {
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


export  async function addUser(user: any) {

    
  try {
    const result = await executeStoredProcedure("sp_RegisterUser", {
      username: {
        type: sql.NVarChar,
        value: user.username,
      },

      email: {
        type: sql.NVarChar,
        value: user.email,
      },

      passwordhash: {
        type: sql.NVarChar,
        value: user.passwordhash,
      },
        rawpassword: {
        type: sql.NVarChar,
        value: user.rawpassword,
      },
      isActive: {
        type: sql.NVarChar,
        value: user.isActive,
      },

      role_id: {
        type: sql.NVarChar,
        value: user.role_Id,
      },
   
      site_Ids: {
        type: sql.NVarChar,
        value: user.sitesIds,
      },
    
    });

    return result.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }
}

  export  async function getAllUsersBySearch(
  q: any,
  page: any,
  ITEM_PER_PAGE: any,
  orderBy: any,
  orderDir: any
) {
  try {
    const result = await executeStoredProcedure("usp_UserPagination", {
      page: {
        type: sql.Int,
        value: page || 1,
      },

      size: {
        type: sql.Int,
        value: ITEM_PER_PAGE || 5,
      },

      search: {
        type: sql.NVarChar,
        value: q || "",
      },

      orderBy: {
        type: sql.NVarChar,
        value: orderBy || "UserId",
      },
      orderDir: {
        type: sql.NVarChar,
        value: orderDir || "DESC",
      },
    });

    const count = result.recordsets[1][0];
    const users = {
      records: result.recordsets[0],
      filtered: count.Filtered,
      total: count.Total,
    };

    return users;
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }
}



// module.exports = {
//   getAllUsersBySearch: getAllUsersBySearch,
//   addUser:addUser
// }