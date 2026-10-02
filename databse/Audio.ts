import React from "react";
import { databaseConnection } from "./databaseConnection";

export async function Audio_Tables() {
  const db = await databaseConnection();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS AUDIO_TABLE (
      AUDIO_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      ORDER_ID INTEGER NOT NULL,
      AUDIO_URI TEXT NOT NULL,

      FOREIGN KEY (ORDER_ID) REFERENCES ORDERS(ORDER_ID)
    );
  `);
}

export async function add_Audio(
  orderID: number,
  audio_uri: string
) {
  const db = await databaseConnection();

  try {
    const result = await db.runAsync(
      `
      INSERT INTO AUDIO_TABLE (ORDER_ID, AUDIO_URI)
      VALUES (?, ?)
      `,
      orderID,
      audio_uri
    );

    console.log("Audio added successfully");

    return result.lastInsertRowId;
  } catch (error) {
    console.log("Failed To add audio in database", error);
    return null;
  }
}

export async function get_Audios(orderID: number) {
  const db = await databaseConnection();

  try {
    const result = await db.getAllAsync(
      `
      SELECT *
      FROM AUDIO_TABLE
      WHERE ORDER_ID = ?
      ORDER BY AUDIO_ID DESC
      `,
      orderID
    );

    return result;
  } catch (error) {
    console.log("Failed To get audio from database", error);
    return [];
  }
}

export async function delete_Audio(audioID: number) {
  const db = await databaseConnection();

  try {
    await db.runAsync(
      `
      DELETE FROM AUDIO_TABLE
      WHERE AUDIO_ID = ?
      `,
      audioID
    );

    console.log("Audio deleted successfully");
  } catch (error) {
    console.log("Failed To delete audio from database", error);
  }
}