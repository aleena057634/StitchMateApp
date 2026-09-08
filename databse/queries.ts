import { databaseConnection } from './databaseConnection';

// export async function queries() {
//   try{
//     const db=await databaseConnection();
//    await db.runAsync(
//     ` INSERT INTO CUSTOMERS(NAME,PHONE) VALUES(?,?)    `, "RAFIA","73838838"   );
//       console.log("Success ");
//   }
//   catch(error){
//     console.log("Failed to insert values into table");
//   }
// }
/*Function to delete value */

// note : number or NUMBER different ha yaad rakhn ais ko 

export async function deleteCustomers(id:number) {
  try{
      const db=  await databaseConnection();
      await db.runAsync(
        `DELETE FROM CUSTOMER WHERE ID=?`,id
      );
  }
  catch(error){
    console.log("Deleted Failed");
    throw(error);

  }
}
// showCustomer


export async function showCustomer() {
  try {
    console.log("showCustomer started");

    const db = await databaseConnection();

    console.log("Database connected for SELECT");

    const result = await db.getAllAsync(
      `SELECT * FROM CUSTOMERS`
    );

    console.log("SELECT completed");
    console.log("Customer result:", result);
    console.table(result);

  } catch (error) {
    console.log("Failed to show:", error);
    throw error;
  }
}
// User add krana ..................................................
export async function adduser(
  NAME: string,
  EMAIL: string,
  PASSWORD: string,
  PHONE: string
) {
  try {
    const db = await databaseConnection();
  const newUser=  await db.runAsync(
      `INSERT INTO USERS(NAME, EMAIL, PASSWORD, PHONE) VALUES (?, ?, ?, ?)`,
      NAME,
      EMAIL,
      PASSWORD,
      PHONE
    );

    console.log("User added successfully and id :",newUser.lastInsertRowId);
    return newUser.lastInsertRowId;
  } catch (error) {
    console.log("User added failed:", error);
    throw error;
  }
}
// ====================Show User==========================================

export async function showUsers() {
  try {
    const db = await databaseConnection();

    const result = await db.getAllAsync(
      `SELECT * FROM USERS`
    );

    console.log("Current users in database:", result);

    return result;
  } catch (error) {
    console.log("Failed to show users:", error);
    throw error;
  }
}
// ===============UserEmail Check for signup and in ==============================


export async function checkEmail(userEmail: string) {
  try {
    const db = await databaseConnection();

    const result = await db.getFirstAsync(
      `SELECT * FROM USERS WHERE EMAIL = ?`,
      userEmail
    );

    return result;
  } catch (error) {
    console.log("Failed to check database", error);
    throw error;
  }
}
// Check user email and password:


export async function SignInValidation(
  email: string,
  pass: string
) {
  try {
    const db = await databaseConnection();

    const result = await db.getFirstAsync<{
      ID: number;
      NAME: string;
      EMAIL: string;
      PASSWORD: string;
      PHONE: string;
    }>(
      `SELECT * FROM USERS WHERE EMAIL = ? AND PASSWORD = ?`,
      [email, pass]
    );

    return result;

  } catch (error) {
    console.log(
      "Failed to check database:",
      error
    );

    throw error;
  }
}