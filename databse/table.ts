import AsyncStorage from "@react-native-async-storage/async-storage";
import { databaseConnection } from "../databse/databaseConnection";


export async function userTable() {
  try {
    const db = await databaseConnection();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS USERS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT,
        EMAIL TEXT,
        PASSWORD TEXT,
        PHONE TEXT
      );
    `);

    // console.log("User table created successfully");
  } catch (error) {
    // console.log("User table creation error:", error);
    throw error;
  }
}


export async function Customer_Table() {
  try {
    const db = await databaseConnection();

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS CUSTOMER (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT NOT NULL,
        PHONE TEXT,
        ADDRESS TEXT,
        USER_ID INTEGER
      );
    `);

      } catch (error) {
    console.log("Failed to create Customer table:", error);
  }
}
// Create Measurement Table

export async function Measurement_table() {
try{

  const db=await databaseConnection();
  
  await db.execAsync(`
  CREATE TABLE IF NOT EXISTS MEASUREMENTS (
    MEASUREMENT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    CUSTOMER_ID INTEGER NOT NULL,
    TYPE TEXT NOT NULL,
    MEASUREMENT_NAME TEXT,

 CHEST REAL,
WAIST REAL,
QAMEEZ_LENGTH REAL,
SHIRT_LENGTH REAL,
SHALWAR_LENGTH REAL,
TROUSER_LENGTH REAL,
SLEEVE REAL,
DAMAN REAL,

HIP REAL,
THIGH REAL,
BOTTOM REAL,

SHOULDER REAL,
COLLAR REAL,
LENGTH REAL,

NOTES TEXT,
    FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMER(ID)
  );
`);

console.log("MEASUREMENTS table created successfully");
}
catch(error){
  console.log("Failed to create Measurement table")
}
}

export async function dropMeasurementTable() {
  try {
    const db = await databaseConnection();

    await db.execAsync(`
      DROP TABLE IF EXISTS MEASUREMENTS;
    `);

    console.log("MEASUREMENTS table dropped successfully");
  } catch (error) {
    console.log("Failed to drop MEASUREMENTS table:", error);
  }
}


export async function getCurrentUser() {
  try {
    const db = await databaseConnection();

    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      return null;
    }

    const user = await db.getFirstAsync<{
      ID: number;
      NAME: string;
      EMAIL: string;
    }>(
      `SELECT ID, NAME, EMAIL FROM USERS WHERE ID = ?`,
      [Number(userId)]
    );

    return user;

  } catch (error) {
    // console.log(
    //   "Failed to get current user:",
    //   error
    // );

    throw error;
  }
}

// get Total Customer 
export async function getTotalCustomers() {
  try {
    const db = await databaseConnection();
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      return 0;
    }
    const result = await db.getFirstAsync<{ total: number }>(
      `SELECT COUNT(*) as total
       FROM CUSTOMER
       WHERE USER_ID = ?`,
      [Number(userId)]
    );
    return result?.total ?? 0;
  } catch (error) {
    console.log("Failed to get total customers:", error);
    return 0;
  }
}

export async function getCustomerName() {
  try {
    const db = await databaseConnection();

    const user_Id = await AsyncStorage.getItem("userId");

    if (!user_Id) {
      return null;
    }

    const result = await db.getFirstAsync<{ NAME: string }>(
      `SELECT NAME FROM USERS WHERE ID = ?`,
      [Number(user_Id)]
    );

    if (result) {
      return result.NAME;
    } else {
      return null;
    }

  } catch (error) {
    // console.log("Failed to get customer name:", error);
    return null;
  }
}
