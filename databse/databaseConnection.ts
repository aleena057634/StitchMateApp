import * as SQLite from "expo-sqlite";

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function databaseConnection() {

  if (!dbPromise) {

    dbPromise = SQLite.openDatabaseAsync("tailorapp.db");

    console.log("Database Open Successfully");

  }

  return dbPromise;
}