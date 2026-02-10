import { db } from "../connection.js";

export const books = db.collection("books", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title"],
      properties: {
        title: {
          bsonType: "string",
          minLength: 1,
        },
      },
    },
  },
});
