import { databaseConnection } from "./databaseConnection";
// Acha is ko saveMeasurmntbutton ma ma call kroo gi usi file ma thek hai

export async function addMeasurement(
  customerId: number,
  type: string,
  measurement: any
) {
  try {
    const db = await databaseConnection();

    await db.runAsync(
      `INSERT INTO MEASUREMENTS (
        CUSTOMER_ID,
        TYPE,
        CHEST,
        WAIST,
        QAMEEZ_LENGTH,
        SHIRT_LENGTH,
        SHALWAR_LENGTH,
        TROUSER_LENGTH,
        SLEEVE,
        DAMAN,
        HIP,
        THIGH,
        BOTTOM,
        SHOULDER,
        COLLAR,
        LENGTH,
        NOTES
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      customerId,
      type,
      measurement.Chest ? Number(measurement.Chest) : null,
      measurement.Waist ? Number(measurement.Waist) : null,
      measurement.Qameez_Length ? Number(measurement.Qameez_Length) : null,
      measurement.Shirt_Length ? Number(measurement.Shirt_Length) : null,
      measurement.Shalwar_Length ? Number(measurement.Shalwar_Length) : null,
      measurement.Trouser_Length ? Number(measurement.Trouser_Length) : null,
      measurement.Sleeve ? Number(measurement.Sleeve) : null,
      measurement.Daman ? Number(measurement.Daman) : null,
      measurement.Hip ? Number(measurement.Hip) : null,
      measurement.Thigh ? Number(measurement.Thigh) : null,
      measurement.Bottom ? Number(measurement.Bottom) : null,
      measurement.Shoulder ? Number(measurement.Shoulder) : null,
      measurement.Collar ? Number(measurement.Collar) : null,
      measurement.Length ? Number(measurement.Length) : null,
      measurement.Notes || null
    );

    console.log("Measurement added successfully");

  }catch (error) {
  console.log("FAILED TO ADD MEASUREMENT:", error);
  throw error;
}
}
export async function getMeasurements(customerId: number) {
  try {
    const db = await databaseConnection();

    const data = await db.getAllAsync(
      `SELECT *, MEASUREMENT_ID AS mEASUREMENT_ID
       FROM MEASUREMENTS
       WHERE CUSTOMER_ID = ?`,
      [customerId]
    );

    console.log("MEASUREMENTS DATA:", data);

    return data;
  } catch (error) {
    console.log("FAILED TO get MEASUREMENT:", error);
    throw error;
  }
}
export async function updateMeasurement(
  measurementId: number,
  measurement: any
) {
  try {
    const db = await databaseConnection();

    await db.runAsync(
      `UPDATE MEASUREMENTS SET
        CHEST = ?,
        WAIST = ?,
        QAMEEZ_LENGTH = ?,
        SHIRT_LENGTH = ?,
        SHALWAR_LENGTH = ?,
        TROUSER_LENGTH = ?,
        SLEEVE = ?,
        DAMAN = ?,
        HIP = ?,
        THIGH = ?,
        BOTTOM = ?,
        SHOULDER = ?,
        COLLAR = ?,
        LENGTH = ?,
        NOTES = ?
      WHERE MEASUREMENT_ID = ?`,
      measurement.Chest ? Number(measurement.Chest) : null,
      measurement.Waist ? Number(measurement.Waist) : null,
      measurement.Qameez_Length ? Number(measurement.Qameez_Length) : null,
      measurement.Shirt_Length ? Number(measurement.Shirt_Length) : null,
      measurement.Shalwar_Length ? Number(measurement.Shalwar_Length) : null,
      measurement.Trouser_Length ? Number(measurement.Trouser_Length) : null,
      measurement.Sleeve ? Number(measurement.Sleeve) : null,
      measurement.Daman ? Number(measurement.Daman) : null,
      measurement.Hip ? Number(measurement.Hip) : null,
      measurement.Thigh ? Number(measurement.Thigh) : null,
      measurement.Bottom ? Number(measurement.Bottom) : null,
      measurement.Shoulder ? Number(measurement.Shoulder) : null,
      measurement.Collar ? Number(measurement.Collar) : null,
      measurement.Length ? Number(measurement.Length) : null,
      measurement.Notes || null,
      measurementId
    );

    console.log("Measurement updated successfully");
    return true;
  } catch (error) {
    console.log("Failed to update measurement:", error);
    return false;
  }
}


export async function deleteMeasurement(measurementId: number) {
  try {
    const db = await databaseConnection();

    console.log("DELETE ID:", measurementId);

    const result = await db.runAsync(
      `DELETE FROM MEASUREMENTS WHERE MEASUREMENT_ID = ?`,
      measurementId
    );

    console.log("DELETE RESULT:", result);

    return true;
  } catch (error) {
    console.log("DELETE ERROR:", error);
    return false;
  }
}


