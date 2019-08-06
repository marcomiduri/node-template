module.exports = mongoose => {
  const { Schema } = mongoose;
  const productSchema = new Schema({
    email: { type: String, index: true, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String },
    email_verified_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    googleId: { type: String, default: null },
  });
  return mongoose.model('users', productSchema);
};
