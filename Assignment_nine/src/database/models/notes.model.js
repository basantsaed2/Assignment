import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
          validator: function (v) {
            return v !== v.toUpperCase();
          },
          message: (props) => `${props.value} cannot be all uppercase letters!`,
        },
    },
    content: { type: String, required: true },
    userId: { type: mongoose.ObjectId, ref: "users", required: true },
  },
  { timestamps: true },
);


noteSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

export const notesModel = mongoose.model("notes", noteSchema);
