import { addDoc, collection } from "firebase/firestore";
import { db } from ".";

export const createExpense = async (data) => {
  const docRef = await addDoc(collection(db, "expenses"), data);
  return docRef;
}