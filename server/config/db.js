const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
mongoose.connection.once("open", () => {
  console.log("📂 Confirmed DB:", mongoose.connection.name);
});


    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📂 Using Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

