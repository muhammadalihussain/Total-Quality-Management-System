// import mongoose from "mongoose";

// const connection = {};

// export const connectToDB = async () => {
//   try {
//     if (connection.isConnected) return;
//     const db = await mongoose.connect(process.env.MONGO);
//     connection.isConnected = db.connections[0].readyState;
//   } catch (error) {
//     console.log(error)
//     throw new Error(error);
//   }
// };

const {
  executeStoredProcedure,
  executeStoredProcedureByName,
  getPool,
  closePool,
  sql,
} = require("../config/db");

var config1 = require("../../lib/config/dbconfig");
const sql1 = require("mssql");

async function getUsers(storeprocedure: any) {
  try {
    let result = await executeStoredProcedure(storeprocedure);

    return result.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }

  // try {
  //   let pool = await sql1.connect(config1);
  //   let user = await pool.request().execute(storeprocedure);

  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }

  //   return user.recordsets;
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

async function findUserByEmail(email: any) {
  try {
    const result = await executeStoredProcedure("findUserByEmail", {
      email: { type: sql.NVarChar, value: email },
    });

    return result.recordsets[0][0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }

  // try {
  //   let pool = await sql1.connect(config1);

  //   const result = await pool
  //     .request()
  //     .input("email", email)
  //     .execute("findUserByEmail");
  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }
  //   return result.recordsets[0][0];
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

async function GetAllCompany() {
  try {
    let result = await executeStoredProcedure("GetAllCompany");

    return result.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }

  // try {
  //   let pool = await sql1.connect(config1);

  //   const result = await pool.request().execute("GetAllCompany");
  //   console.log(result);
  //   //   console.log(result.recordsets[0]);
  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }
  //   return result.recordsets[0];
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

async function GetAllRole() {
  try {
    let result = await executeStoredProcedure("GetAllRole");

    return result.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }

  // try {
  //   let pool = await sql1.connect(config1);

  //   const result = await pool.request().execute("GetAllRole");
  //   //   console.log(result.recordsets[0]);

  //   console.log(result);
  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }
  //   return result.recordsets[0];
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

async function GetSitesByUserId(id: any) {
  try {
    const result = await executeStoredProcedure("GetSitesByUserId", {
      UserId: { type: sql.Int, value: id },
    });

    return result.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }

  // try {
  //   let pool = await sql1.connect(config1);

  //   const result = await pool
  //     .request()
  //     .input("UserId", id)
  //     .execute("GetSitesByUserId");
  //   //   console.log(result.recordsets[0]);
  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }
  //   return result.recordsets[0];
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

async function GetAllInventSite(id: any) {
  try {
    const result = await executeStoredProcedure("GetAllINVENTSITE", {
      DataAreaId: { type: sql.NVarChar, value: id },
    });

    return result.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }

  // try {
  //   let pool = await sql1.connect(config1);

  //   const result = await pool
  //     .request()
  //     .input("DataAreaId", id)
  //     .execute("GetAllINVENTSITE");
  //   //   console.log(result.recordsets[0]);
  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }
  //   return result.recordsets[0];
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

async function GetProductionLineBySite(DataAreaId: any, Site: any) {
  try {
    const result = await executeStoredProcedure("GetProductionLineBySite", {
      DataAreaId: { type: sql.NVarChar, value: DataAreaId },
      Site: { type: sql.NVarChar, value: Site },
    });

    return result.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }
}

async function GetMenusByRole(id: any) {
  try {
    const result = await executeStoredProcedure("GetMenusByRole", {
      id: { type: sql.Int, value: id },
    });

    return result.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }
  // try {
  //   let pool = await sql1.connect(config1);

  //   const result = await pool
  //     .request()
  //     .input("id", id)
  //     .execute("GetMenusByRole");
  //   //   console.log(result.recordsets[0]);
  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }
  //   return result.recordsets[0];
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

//https://codeomelet.com/posts/crafting-paginated-api-with-nodejs-and-mssql1

async function getAllUsersBySearch(
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
        value: page || 5,
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
        value: orderBy || "Id",
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

  // try {
  //   let pool = await sql1.connect(config1);

  //   const result = await pool
  //     .request()
  //     .input("page", page || 5)
  //     .input("size", ITEM_PER_PAGE || 2)
  //     .input("search", q || "")
  //     .input("orderBy", orderBy || "Id")
  //     .input("orderDir", orderDir || "DESC")
  //     .execute("usp_UserPagination");

  //   const count = result.recordsets[1][0];
  //   const users = {
  //     records: result.recordsets[0],
  //     filtered: count.Filtered,
  //     total: count.Total,
  //   };
  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }
  //   return users;
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

async function ProductfindById(id: any) {
  try {
    let pool = await sql1.connect(config1);

    const result = await pool
      .request()
      .input("id", id)
      .execute("ProductfindById");

    return result.recordsets[0][0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // Close the connection when done
    sql1.close();
  }
}

async function UpdateUserPassword(userId: any, password: any) {
  try {
    const result = await executeStoredProcedure("UpdateUserPassword", {
      userId: { type: sql.Int, value: userId },
      password: { type: sql.NVarChar, value: password },
    });

    return result.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }

  // try {
  //   let pool = await sql1.connect(config1);

  //   const result = await pool
  //     .request()
  //     .input("userId", userId)
  //     .input("password", password)
  //     .execute("UpdateUserPassword");
  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }
  //   return result.recordsets;
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

async function UserfindById(id: any) {
  // console.log(id);
  try {
    const result = await executeStoredProcedure("UserfindById", {
      id: { type: sql.Int, value: id },
    });

    return result.recordsets[0][0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }

  // try {
  //   let pool = await sql1.connect(config1);

  //   const result = await pool.request().input("id", id).execute("UserfindById");
  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }
  //   return result.recordsets[0][0];
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

async function getAllProductsBySearch(
  q: any,
  page: any,
  orderBy: any,
  orderDir: any
) {
  try {
    let pool = await sql1.connect(config1);
    const ITEM_PER_PAGE = 5;

    const result = await pool
      .request()
      .input("page", page || 5)
      .input("size", ITEM_PER_PAGE || 2)
      .input("search", q || "")
      .input("orderBy", orderBy || "Id")
      .input("orderDir", orderDir || "DESC")
      .execute("usp_ProductPagination");
    const count = result.recordsets[1][0];
    const products = {
      records: result.recordsets[0],
      filtered: count.Filtered,
      total: count.Total,
    };

    if (pool && !pool.ending) {
      pool.close;
      sql1.close;
    }
    return products;
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // Close the connection when done
    sql1.close();
  }
}

async function findUserByIdAndUpdate(id: any, user: any) {
  try {
    const result = await executeStoredProcedure("findUserByIdAndUpdate", {
      id: {
        type: sql.Int,
        value: id,
      },

      username: {
        type: sql.NVarChar,
        value: user.username,
      },

      email: {
        type: sql.NVarChar,
        value: user.email,
      },

      password: {
        type: sql.NVarChar,
        value: user.newpassword,
      },

      role_id: {
        type: sql.NVarChar,
        value: user.role_Id,
      },

      site_Ids: {
        type: sql.NVarChar,
        value: user.sitesIds,
      },

      // isAdmin: {
      //   type: sql.NVarChar,
      //   value: user.isAdmin,
      // },

      isActive: {
        type: sql.NVarChar,
        value: user.isActive,
      },

      phone: {
        type: sql.NVarChar,
        value: user.phone,
      },

      address: {
        type: sql.NVarChar,
        value: user.address,
      },
    });

    return result.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }

  // try {
  //   let pool = await sql1.connect(config1);
  //   let updateUser = await pool
  //     .request()
  //     .input("id", sql1.Int, id)
  //     .input("username", sql1.NVarChar, user.username)
  //     .input("email", sql1.NVarChar, user.email)
  //     .input("password", sql1.NVarChar, user.password)
  //     .input("img", sql1.NVarChar, "")
  //     .input("isAdmin", sql1.NVarChar, user.isAdmin)
  //     .input("isActive", sql1.NVarChar, user.isActive)
  //     .input("phone", sql1.NVarChar, user.phone)
  //     .input("address", sql1.NVarChar, user.address)
  //     .execute("findUserByIdAndUpdate"); //storeProcedure
  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }
  //   return updateUser.recordsets;
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

async function addUser(user: any) {
  try {
    const result = await executeStoredProcedure("InsertUser", {
      username: {
        type: sql.NVarChar,
        value: user.username,
      },

      email: {
        type: sql.NVarChar,
        value: user.email,
      },

      password: {
        type: sql.NVarChar,
        value: user.password,
      },

      // isAdmin: {
      //   type: sql.NVarChar,
      //   value: user.isAdmin,
      // },

      isActive: {
        type: sql.NVarChar,
        value: user.isActive,
      },

      role_id: {
        type: sql.NVarChar,
        value: user.role_Id,
      },
      phone: {
        type: sql.NVarChar,
        value: user.phone,
      },

      site_Ids: {
        type: sql.NVarChar,
        value: user.sitesIds,
      },
      address: {
        type: sql.NVarChar,
        value: user.address,
      },
    });

    return result.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }

  // try {
  //   let pool = await sql1.connect(config1);
  //   let insertUser = await pool
  //     .request()
  //     .input("username", sql1.NVarChar, user.username)
  //     .input("email", sql1.NVarChar, user.email)
  //     .input("password", sql1.NVarChar, user.password)
  //     .input("img", sql1.NVarChar, "")
  //     .input("isAdmin", sql1.NVarChar, user.isAdmin)
  //     .input("isActive", sql1.NVarChar, user.isActive)
  //     .input("phone", sql1.NVarChar, user.phone)
  //     .input("address", sql1.NVarChar, user.address)
  //     .execute("InsertUser"); //storeProcedure
  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }
  //   return insertUser.recordsets;
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

async function deleteUser(id: any) {
  try {
    const result = await executeStoredProcedure("deleteUser", {
      id: { type: sql.Int, value: id },
    });

    // let result = await pool
    //   .request()
    //   .input("dataareaid", data.dataSend.dataAreaId)
    //   .input("site", data.dataSend.site == 0 ? null : data.dataSend.site)
    //   .execute("GetDispatchInventory");

    // console.log(result.recordsets[0]);
    return result.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // closePool();
  }

  // try {
  //   let pool = await sql1.connect(config1);
  //   let deleteUser = await pool
  //     .request()
  //     .input("id", sql1.Int, id)
  //     .execute("deleteUser"); //storeProcedure
  //   if (pool && !pool.ending) {
  //     pool.close;
  //     sql1.close;
  //   }
  //   return deleteUser.recordsets;
  // } catch (err) {
  //   // Handle errors
  //   console.error("Error :", err);
  // } finally {
  //   // Close the connection when done
  //   sql1.close();
  // }
}

async function findProductByIdAndUpdate(id: any, product: any) {
  try {
    let pool = await sql1.connect(config1);
    let updateProduct = await pool
      .request()
      .input("id", sql1.Int, id)
      .input("title", sql1.NVarChar, product.title)
      .input("desc", sql1.NVarChar, product.desc)
      .input("price", sql1.NVarChar, product.price)
      .input("stock", sql1.NVarChar, product.stock)
      .input("color", sql1.NVarChar, product.color)
      .input("size", sql1.NVarChar, product.size)
      .execute("findProductByIdAndUpdate"); //storeProcedure
    if (pool && !pool.ending) {
      pool.close;
      sql1.close;
    }
    return updateProduct.recordsets;
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // Close the connection when done
    sql1.close();
  }
}

async function addProduct(product: any) {
  try {
    let pool = await sql1.connect(config1);
    let insertProduct = await pool
      .request()
      .input("title", sql1.NVarChar, product.title)
      .input("desc", sql1.NVarChar, product.desc)
      .input("price", sql1.NVarChar, product.price)
      .input("stock", sql1.NVarChar, product.stock)
      .input("color", sql1.NVarChar, product.color)
      .input("size", sql1.NVarChar, product.size)

      .execute("InsertProduct"); //storeProcedure
    if (pool && !pool.ending) {
      pool.close;
      sql1.close;
    }
    return insertProduct.recordsets;
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // Close the connection when done
    sql1.close();
  }
}

async function deleteProduct(id: any) {
  try {
    let pool = await sql1.connect(config1);
    let deleteProd = await pool
      .request()
      .input("id", sql1.Int, id)
      .execute("deleteProduct"); //storeProcedure

    return deleteProd.recordsets;
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // Close the connection when done
    sql1.close();
  }
}

async function getAllUsers() {
  try {
    let pool = await sql1.connect(config1);
    let users = await pool
      .request()
      .query(
        "SELECT Id,username,email,password,img,isActive,phone,address, createdAt  from [User] "
      );
    if (pool && !pool.ending) {
      pool.close;
      sql1.close;
    }
    return users.recordsets[0];
  } catch (err) {
    // Handle errors
    console.error("Error :", err);
  } finally {
    // Close the connection when done
    sql1.close();
  }
}

async function findUsers(limit = 5, offset = 0) {
  try {
    // Connect to the database
    const pool = await sql1.connect(config1);

    // Execute a query
    const result = await pool
      .request()
      .input("offset", sql1.Int, offset)
      .input("limit", sql1.Int, limit)
      .query(
        `SELECT * FROM [User] 
         ORDER BY username
         OFFSET @offset ROWS 
         FETCH FIRST @limit ROWS ONLY`
      );

    return result.recordset;
  } catch (err) {
    console.error("Error finding authors:", err);
  }
}

module.exports = {
  GetSitesByUserId: GetSitesByUserId,
  getUsers: getUsers,
  GetAllRole: GetAllRole,
  getAllUsers: getAllUsers,
  getAllUsersBySearch: getAllUsersBySearch,
  getAllProductsBySearch: getAllProductsBySearch,
  findUsers: findUsers,
  addUser: addUser,
  addProduct: addProduct,
  deleteProduct: deleteProduct,

  
  deleteUser: deleteUser,
  UserfindById: UserfindById,
  ProductfindById: ProductfindById,
  findUserByIdAndUpdate: findUserByIdAndUpdate,
  findProductByIdAndUpdate: findProductByIdAndUpdate,
  findUserByEmail: findUserByEmail,
  UpdateUserPassword: UpdateUserPassword,
  GetMenusByRole: GetMenusByRole,
  GetAllCompany: GetAllCompany,
  GetAllInventSite: GetAllInventSite,
  GetProductionLineBySite: GetProductionLineBySite,
};
