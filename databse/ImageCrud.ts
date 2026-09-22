
import AsyncStorage from "@react-native-async-storage/async-storage";
import { databaseConnection } from "./databaseConnection";

export async function ProfileImage() {
  const db = await databaseConnection();

  try {
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS PROFILE_IMAGE (
        IMAGE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        USER_ID INTEGER NOT NULL,
        IMAGE_URI TEXT NOT NULL,
        FOREIGN KEY (USER_ID) REFERENCES USERS(ID)
      );
    `);

    console.log("Image Table create for profile..");
  } catch (Error) {
    console.log("Failed to Create Image Table for User Profile...");
  }
}

export async function saveProfileImage(imageUri: string) {
  const db = await databaseConnection();

  try {
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      console.log("User ID not found");
      return;
    }

    await db.runAsync(
      `DELETE FROM PROFILE_IMAGE WHERE USER_ID = ?`,
      Number(userId)
    );

    await db.runAsync(
      `INSERT INTO PROFILE_IMAGE (USER_ID, IMAGE_URI)
       VALUES (?, ?)`,
      Number(userId),
      imageUri
    );

    console.log("Profile image saved");
  } catch (error) {
    console.log("Failed to save profile image:", error);
  }
}

export async function getProfileImage() {
  const db = await databaseConnection();

  try {
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      return null;
    }

    const result = await db.getFirstAsync<{ IMAGE_URI: string }>(
      `SELECT IMAGE_URI
       FROM PROFILE_IMAGE
       WHERE USER_ID = ?
       LIMIT 1`,
      Number(userId)
    );

    return result?.IMAGE_URI || null;
  } catch (error) {
    console.log("Failed to get profile image:", error);
    return null;
  }
}

export async function Order_Image() {

  const db = databaseConnection();

  try {
    (await db).runAsync(
      `CREATE TABLE IF NOT EXISTS ORDER_IMAGE (
        ORDER_IMAGE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        ORDER_ID INTEGER NOT NULL,
        ORDER_IMAGE_URI TEXT NOT NULL,
        FOREIGN KEY (ORDER_ID) REFERENCES ORDERS(ORDER_ID)
      )`
    );

  } catch (error) {
    console.log("\nFailed to create order Image table..\n");
    throw error;
  }
}

export async function addOrderImage(
  imageUri: string,
  orderId: number
) {
  const db = await databaseConnection();

  try {
    await db.runAsync(
      `
      INSERT INTO ORDER_IMAGE
      (ORDER_ID, ORDER_IMAGE_URI)
      VALUES (?, ?)
      `,
      [orderId, imageUri]
    );
    console.log("\ninsert successfullly")
  } catch (error) {
    console.log("Failed to insert image");
    throw error;
  }
}
export async function getOrderImage(orderId: number) {
  const db = await databaseConnection();

  try {
    const result = await db.getFirstAsync<{ ORDER_IMAGE_URI: string }>(
      `
      SELECT ORDER_IMAGE_URI
      FROM ORDER_IMAGE
      WHERE ORDER_ID = ?
      `,
      Number(orderId)
    );

    console.log("Image get successfully");

    return result?.ORDER_IMAGE_URI || null;
  } catch (error) {
    console.log("Failed to get order image");
    throw error;
  }
}

export async function deleteOrderImage(orderId: number) {
  const db = await databaseConnection();

  try {
    await db.runAsync(
      `
      DELETE FROM ORDER_IMAGE
      WHERE ORDER_ID = ?
      `,
      orderId
    );

    console.log("Order image deleted successfully");
  } catch (error) {
    console.log("Failed to delete order image");
    throw error;
  }
}
export async function Update_OrderImage(
  imageuri: string,
  orderId: number
) {
  const db = await databaseConnection();

  try {
    await db.runAsync(
      `
      UPDATE ORDER_IMAGE
      SET ORDER_IMAGE_URI = ?
      WHERE ORDER_ID = ?
      `,
      imageuri,
      orderId
    );

    console.log("Order image updated successfully");
  } catch (error) {
    console.log("Failed to update OrderImage");
    throw error;
  }
}