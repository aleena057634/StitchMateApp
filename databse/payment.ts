import AsyncStorage from "@react-native-async-storage/async-storage";
import { databaseConnection } from "./databaseConnection";

export async function payment_table() {
  try {
    const db = await databaseConnection();

    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS PAYMENT(
        PAYMENT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        ORDER_ID INTEGER NOT NULL,
        PAYMENT_AMOUNT REAL NOT NULL,
        PAYMENT_DATE TEXT,
        FOREIGN KEY (ORDER_ID) REFERENCES ORDERS(ORDER_ID)
      )
    `);

    console.log("Payment table created");
  } catch (error) {
    console.log("Failed to create Payment table", error);
    throw error;
  }
}

export async function Payment_Value(
  orderId: number,
  paymentAmount: number,
  paymentDate: string
) {
  const db = await databaseConnection();

  try {
    const order = await db.getFirstAsync<{
      ORDER_PAYMENT: number;
      ORDER_ADVANCEPAYMENT: number;
      ORDER_REMAINING: number;
    }>(
      `
      SELECT
        ORDER_PAYMENT,
        ORDER_ADVANCEPAYMENT,
        ORDER_REMAINING
      FROM ORDERS
      WHERE ORDER_ID = ?
      `,
      [orderId]
    );

    if (!order) {
      throw new Error("Order not found");
    }

    const newPayment =
      Number(order.ORDER_ADVANCEPAYMENT || 0) +
      Number(paymentAmount);

    const remainingAmount =
      Number(order.ORDER_PAYMENT || 0) -
      newPayment;

    // Payment history mein payment save
    await db.runAsync(
      `
      INSERT INTO PAYMENT
        (ORDER_ID, PAYMENT_AMOUNT, PAYMENT_DATE)
      VALUES (?, ?, ?)
      `,
      [orderId, paymentAmount, paymentDate]
    );

    // Order ka advance aur remaining update
    await db.runAsync(
      `
      UPDATE ORDERS
      SET ORDER_ADVANCEPAYMENT = ?,
          ORDER_REMAINING = ?
      WHERE ORDER_ID = ?
      `,
      [newPayment, remainingAmount, orderId]
    );

    console.log("Payment added and Order updated");
  } catch (error) {
    console.log("Failed to add payment:", error);
    throw error;
  }
}

export async function Payment_Show() {
  const id = await AsyncStorage.getItem("userId");

  const db = await databaseConnection();

  try {
    const data = await db.getAllAsync(
      `
      SELECT
        PAYMENT.PAYMENT_ID,
        PAYMENT.ORDER_ID,
        ORDERS.ORDER_NAME,
        PAYMENT.PAYMENT_AMOUNT,
        PAYMENT.PAYMENT_DATE
      FROM PAYMENT

      INNER JOIN ORDERS
      ON PAYMENT.ORDER_ID = ORDERS.ORDER_ID

      WHERE ORDERS.USER_ID = ?

      ORDER BY PAYMENT.PAYMENT_ID DESC
      `,
      [Number(id)]
    );

    return data;
  } catch (error) {
    console.log("Failed to get Payment", error);
    return [];
  }
}

export async function ClearPaymentHistory() {
  const db = await databaseConnection();

  try {
    await db.runAsync(`DELETE FROM PAYMENT`);

    console.log("Payment history cleared");
  } catch (error) {
    console.log("Failed to clear payment history", error);
  }
}

// Notification ke liye customer name
export async function getCustomerNameById(customerId: number) {
  try {
    const db = await databaseConnection();

    const result = await db.getFirstAsync<{ NAME: string }>(
      `SELECT NAME FROM CUSTOMER WHERE ID = ?`,
      [customerId]
    );

    return result?.NAME ?? null;
  } catch (error) {
    console.log("Failed to get customer name:", error);
    return null;
  }
}