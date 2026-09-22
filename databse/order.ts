
import AsyncStorage from "@react-native-async-storage/async-storage";
import { databaseConnection } from "./databaseConnection";

export async function order_Table() {
  try {
    const db = await databaseConnection();

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS ORDERS (
        ORDER_ID INTEGER PRIMARY KEY AUTOINCREMENT,

        ORDER_NAME TEXT,
        QUANTITY INTEGER NOT NULL,

        ORDER_STAUS TEXT NOT NULL,
        ORDER_PIRIORITY TEXT NOT NULL,

        ORDER_ARRIVAL_DATE TEXT NOT NULL,
        ORDER_DEPARTURE_DATE TEXT NOT NULL,

        ORDER_PAYMENT REAL NOT NULL,
        ORDER_ADVANCEPAYMENT REAL DEFAULT 0,
        ORDER_REMAINING REAL DEFAULT 0,

        CUSTOMER_ID INTEGER NOT NULL,
        MEASUREMENT_ID INTEGER NOT NULL,

        USER_ID INTEGER NOT NULL,

        NOTES TEXT,

        FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMER(ID),
        FOREIGN KEY (MEASUREMENT_ID) REFERENCES MEASUREMENTS(MEASUREMENT_ID)
      );
    `);

    console.log("ORDERS table created successfully");
  } catch (error) {
    console.log("Failed to create table for orders:", error);
  }
}
export async function addOrder(
  orderName: string,
  quantity: number,
  status: string,
  priority: string,
  arrivalDate: string,
  departureDate: string,
  payment: number,
  advancePayment: number,
  remainingPayment: number,
  customerId: number,
  measurementId: number,
  notes: string
) {
  try {
    const db = await databaseConnection();

    // Currently logged-in user ka ID nikal rahe hain
    const userId = await AsyncStorage.getItem("userId");

    // Agar user login nahi hai to order add nahi hoga
   if (!userId) {
  console.log("User ID not found");
  throw new Error("User ID not found");
}

    const result = await db.runAsync(
      `INSERT INTO ORDERS (
        ORDER_NAME,
        QUANTITY,
        ORDER_STAUS,
        ORDER_PIRIORITY,
        ORDER_ARRIVAL_DATE,
        ORDER_DEPARTURE_DATE,
        ORDER_PAYMENT,
        ORDER_ADVANCEPAYMENT,
        ORDER_REMAINING,
        CUSTOMER_ID,
        MEASUREMENT_ID,
        USER_ID,
        NOTES
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      
      orderName,
      quantity,
      status,
      priority,
      arrivalDate,
      departureDate,
      payment,
      advancePayment,
      remainingPayment,
      customerId,
      measurementId,
      Number(userId),
      notes || null
    );

    console.log("Order added successfully");

    return result;

  } catch (error) {
    console.log("Failed to add order:", error);
    throw error;
  }
}


// export async function addQuantityColumn() {
//   try {
//     const db = await databaseConnection();

//     await db.execAsync(`
//       ALTER TABLE ORDERS
//       ADD COLUMN QUANTITY INTEGER NOT NULL DEFAULT 1;
//     `);

//     console.log("QUANTITY column added successfully");
//   } catch (error) {
//     console.log("Failed to add QUANTITY column:", error);
//   }
// }


export async function getAllOrders() {
  try {
    const db = await databaseConnection();

    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      return [];
    }

    const data = await db.getAllAsync(
      `SELECT *
       FROM ORDERS
       WHERE USER_ID = ?
       ORDER BY ORDER_ID DESC`,
      [Number(userId)]
    );

    console.log("Current User Orders:", data);

    return data;
  } catch (error) {
    console.log("Failed to load all orders:", error);
    return [];
  }
}


export async function deleteOrder(orderId: number) {
  try {
    const db = await databaseConnection();

    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      return;
    }

    // Sirf current user ka order delete hoga
    await db.runAsync(
      `DELETE FROM ORDERS
       WHERE ORDER_ID = ?
       AND USER_ID = ?`,
      [orderId, Number(userId)]
    );

    console.log("Order deleted successfully");

  } catch (error) {
    console.log("Failed to delete order:", error);

    throw error;
  }
}


export async function Order_detail(id: number) {
  try {
    const db = await databaseConnection();

    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      return null;
    }

    // Sirf current user ka order detail milega
    const data = await db.getFirstAsync(
      `SELECT *
       FROM ORDERS
       WHERE ORDER_ID = ?
       AND USER_ID = ?`,
      [id, Number(userId)]
    );

    return data;

  } catch (error) {
    console.log(
      "Failed to get Order Details...\n",
      error
    );

    return null;
  }
}


// ==========================================
// RECENT ORDERS
// Current user ke latest 5 orders
// ==========================================
export async function getRecentOrders() {
  try {
    const db = await databaseConnection();

    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      return [];
    }

    const data = await db.getAllAsync(
      `
      SELECT *
      FROM ORDERS
      WHERE USER_ID = ?
      ORDER BY ORDER_ID DESC
      LIMIT 3
      `,
      [Number(userId)]
    );

    return data;

  } catch (error) {
    console.log("Failed to get recent orders:", error);
    return [];
  }
}


// ==========================================
// TODAY'S ORDERS
// Current user ki aaj ki departure date wale orders
// ==========================================
export async function getTodayOrders() {
  try {
    const db = await databaseConnection();

    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      return [];
    }

    const data = await db.getAllAsync(
      `
      SELECT *
      FROM ORDERS
      WHERE ORDER_DEPARTURE_DATE = date('now')
      AND USER_ID = ?
      ORDER BY ORDER_ID DESC
      `,
      [Number(userId)]
    );

    return data;

  } catch (error) {
    console.log("Failed to get today's orders:", error);
    return [];
  }
}


// ==========================================
// URGENT ORDERS
// Current user ke sirf Urgent orders
// ==========================================
export async function getUrgentOrders() {
  try {
    const db = await databaseConnection();

    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      return [];
    }

    const data = await db.getAllAsync(
      `
      SELECT *
      FROM ORDERS
      WHERE ORDER_PIRIORITY = ?
      AND USER_ID = ?
      ORDER BY ORDER_ID DESC
      `,
      ["Urgent", Number(userId)]
    );

    return data;

  } catch (error) {
    console.log("Failed to get urgent orders:", error);
    return [];
  }
}


export async function updateOrderStatus(
  orderId: number,
  status: string
) {
  try {
    const db = await databaseConnection();

    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      return false;
    }

    // Sirf current user ke order ka status update hoga
    await db.runAsync(
      `UPDATE ORDERS
       SET ORDER_STAUS = ?
       WHERE ORDER_ID = ?
       AND USER_ID = ?`,
      status,
      orderId,
      Number(userId)
    );

    console.log("Order status updated successfully");

    return true;

  } catch (error) {
    console.log("Failed to update order status:", error);

    return false;
  }
}

export async function TotalOrders() {
  const db = await databaseConnection();

  const userId = await AsyncStorage.getItem("userId");

  if (!userId) {
    return 0;
  }

  const total: any = await db.getFirstAsync(
    `SELECT COUNT(*) as count FROM ORDERS WHERE USER_ID = ?`,
    [userId]
  );

  console.log("Total Orders is", total);

  return total?.count || 0;
}
export async function getTotalAmount(orderId: number){
 try {
   const db=await databaseConnection();
 const Total=  db.getFirstAsync(`
        SELECT  ORDER_PAYMENT  FROM ORDER WHERE ORDER_ID=? 
    `,orderId)
    console.log("Total amount=",Total);
    return Total;
 } catch (error) {
  console.log("Failed to get Total mount")
 }
}

export async function PaidAmount(orderId: number) {
  const db = await databaseConnection();

  try {
    await db.runAsync(
      `UPDATE ORDERS
       SET ORDER_REMAINING = 0
       WHERE ORDER_ID = ?`,
      [orderId]
    );
  

    console.log("Order marked as paid");
  } catch (error) {
    console.log("Failed to mark order as paid", error);
  }
}

export async function Mark(orderId: number) {
  const db = await databaseConnection();

  try {
    const order = await db.getFirstAsync<{
      ORDER_ADVANCEPAYMENT: number;
      ORDER_REMAINING: number;
    }>(
      `
      SELECT ORDER_ADVANCEPAYMENT, ORDER_REMAINING
      FROM ORDERS
      WHERE ORDER_ID = ?
      `,
      [orderId]
    );

    if (!order) {
      return;
    }
if (order.ORDER_REMAINING <= 0) {
  return;
}
    const newPayment = order.ORDER_REMAINING;

    const newPaidAmount =
      order.ORDER_ADVANCEPAYMENT + newPayment;

    await db.runAsync(
      `
      INSERT INTO PAYMENT
      (ORDER_ID, PAYMENT_AMOUNT, PAYMENT_DATE)
      VALUES (?, ?, ?)
      `,
      [
        orderId,
        newPayment,
      new Date().toLocaleDateString()
      ]
    );

    await db.runAsync(
      `
      UPDATE ORDERS
      SET ORDER_ADVANCEPAYMENT = ?,
          ORDER_REMAINING = 0
      WHERE ORDER_ID = ?
      `,
      [newPaidAmount, orderId]
    );

    console.log("Order marked as paid");
  } catch (error) {
    console.log("Failed to mark order as paid", error);
  }
}

export async function Partial_Payment(
  orderId: number,
  amount: number
) {
  const db = await databaseConnection();

  const order = await db.getFirstAsync<{
    ORDER_ADVANCEPAYMENT: number;
    ORDER_REMAINING: number;
  }>(
    `
    SELECT ORDER_ADVANCEPAYMENT, ORDER_REMAINING
    FROM ORDERS
    WHERE ORDER_ID = ?
    `,
    [orderId]
  );

  if (!order) {
    return;
  }

  const newPayment = amount;

  const newPaidAmount =
    order.ORDER_ADVANCEPAYMENT + amount;

  const newRemaining =
    order.ORDER_REMAINING - amount;

  await db.runAsync(
    `
    INSERT INTO PAYMENT
    (ORDER_ID, PAYMENT_AMOUNT, PAYMENT_DATE)
    VALUES (?, ?, ?)
    `,
    [
      orderId,
      newPayment,
      
      new Date().toLocaleDateString(),
    ]
  );

  await db.runAsync(
    `
    UPDATE ORDERS
    SET ORDER_ADVANCEPAYMENT = ?,
        ORDER_REMAINING = ?
    WHERE ORDER_ID = ?
    `,
    [newPaidAmount, newRemaining, orderId]
  );
}