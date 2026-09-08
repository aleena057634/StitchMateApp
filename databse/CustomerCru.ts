import AsyncStorage from "@react-native-async-storage/async-storage";
import { databaseConnection } from "./databaseConnection";

export async function AddCustomer(
  name: string,
  address: string,
  phone: string
) {
  try {
    const db = await databaseConnection();

    // Current logged-in user ki ID
    const userId = await AsyncStorage.getItem("userId");

    console.log("Current User ID:", userId);

    if (!userId) {
      throw new Error("No logged-in user found");
    }

    await db.runAsync(
      `INSERT INTO CUSTOMER (NAME, ADDRESS, PHONE, USER_ID)
       VALUES (?, ?, ?, ?)`,
      name,
      address,
      phone,
      Number(userId)
    );

    console.log("Customer added successfully");

  } catch (error) {
    console.log("Failed to add customer:", error);
    throw error;
  }
}

export async function getCustomers() {
  try {
    const db = await databaseConnection();

    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      return [];
    }

    const customers = await db.getAllAsync<{ID: number; NAME: string;PHONE: string;ADDRESS: string;}>
    (
  `SELECT ID,
    NAME,
    PHONE,
    ADDRESS
   FROM CUSTOMER
   WHERE USER_ID = ?`,
  Number(userId)
);

    console.log("Customers:", customers);

    return customers;

  } catch (error) {
    console.log("Failed to get customers:", error);
    return [];
  }
}

export async function DeleteCustomer(id: number) {
  try {
    const db = await databaseConnection();

    const result = await db.runAsync(
      `DELETE FROM CUSTOMER WHERE ID = ?`,
      id
    );

    console.log("Customer deleted successfully:", result);

    return result;

  } catch (error) {
    console.log("Failed to delete customer:", error);
    throw error;
  }
}

export async function updateCunstomer(
  id: number,
  name: string,
  address: string,
  phone: string
) {
  try {
    const db = await databaseConnection();

    await db.runAsync(
  `UPDATE CUSTOMER
   SET NAME = ?, ADDRESS = ?, PHONE = ?
   WHERE ID = ?`,
  name,
  address,
  phone,
  id
);

    console.log("Customer updated successfully");

  } catch (error) {
    console.log("Failed to update customer:", error);
    throw error;
  }
}