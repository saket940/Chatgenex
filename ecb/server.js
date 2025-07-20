const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Compass (Replace `<your_database_name>` with your actual database name)
mongoose
  .connect("mongodb+srv://asdadarya2222:6DkNIukzTmXJhDF1@cluster0.mlec2on.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Create User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// Register Route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  else if(await User.findOne({ email })){
    return res.status(400).json({ message: "This email is allrady register" });
  }

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

  // Login Route
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = await User.findOne({ email, password });

      if (user) {
        res.status(200).json({ message: "Login successful", email });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  // API Route to Save Chatbot Data
app.post("/api/chatbots", async (req, res) => {
  try {
    const { userEmail, chatbotName, greetingMessage, trainingData,trainingpdf,trainingpdfdata,userMassagesBackgroundColor,chatbotMassagesBackgroundColor } = req.body;

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required!" });
    }

    // Generate collection name from user email
    const collectionName = userEmail.replace(/[@.]/g, "_");
    // Check if the model already exists
    let ChatbotModel;
    if (mongoose.models[collectionName]) {
      ChatbotModel = mongoose.models[collectionName]; // Use existing model
    } else {
      // Define a new schema only if it doesn't exist
    // Create dynamic model (it won't create a new collection if it already exists)
    const chatbotSchema = new mongoose.Schema(
      {
        chatbotName: String,
        greetingMessage: String,
        trainingData: String,
        trainingpdf:String,
        trainingpdfdata:String,
        userMassagesBackgroundColor:String,
        chatbotMassagesBackgroundColor:String
      },
      { collection: collectionName }
    );

         ChatbotModel = mongoose.model(collectionName, chatbotSchema);
  }
    // Save chatbot data

    const newChatbot = new ChatbotModel({ chatbotName, greetingMessage, trainingData,trainingpdf,trainingpdfdata,userMassagesBackgroundColor,chatbotMassagesBackgroundColor  });
    await newChatbot.save();

    res.status(201).json({ message: "Chatbot saved successfully!"+trainingpdf+trainingpdfdata });

  } catch (error) {
    res.status(500).json({ message: "Error saving chatbot", error });
  }
});


app.get("/api/chatbots/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    if (!userEmail) {
      return res.status(400).json({ message: "User email is required!" });
    }

    // Generate the collection name based on email
    const collectionName = userEmail.replace(/[@.]/g, "_");

    // Check if the collection exists in MongoDB
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === collectionName);

    if (!collectionExists) {
      return res.status(200).json({ chatbots: [] }); // Return empty array instead of error
    }

    // Check if model exists in Mongoose cache
    let ChatbotModel;
    if (mongoose.models[collectionName]) {
      ChatbotModel = mongoose.models[collectionName]; // Use existing model
    } else {
      // Define a schema dynamically if not defined
      const chatbotSchema = new mongoose.Schema(
        {
          chatbotName: { type: String, required: true },
          greetingMessage: String,
          trainingData: String,
          trainingpdf:String,
          trainingpdfdata:String,
          userMassagesBackgroundColor:String,
          chatbotMassagesBackgroundColor:String

        },
        { collection: collectionName }
      );

      ChatbotModel = mongoose.model(collectionName, chatbotSchema);
    }

    // Fetch chatbots from the user-specific collection
    const chatbots = await ChatbotModel.find();

    res.status(200).json({ chatbots });
  } catch (error) {
    console.error("Error retrieving chatbots:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});
app.delete("/api/chatbots/:userEmail/:id", async (req, res) => {
  try {
    const { userEmail, id } = req.params;
    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid chatbot ID" });
    }
    // Generate the collection name based on user email
    const collectionName = userEmail.replace(/[@.]/g, "_");

    // Check if model already exists in Mongoose
    let ChatbotModel;
    if (mongoose.models[collectionName]) {
      ChatbotModel = mongoose.models[collectionName]; // Use existing model
    } else {
      // Define schema dynamically
      const chatbotSchema = new mongoose.Schema(
        {
          chatbotName: String,
          greetingMessage: String,
          trainingData: String,
          trainingpdf:String,
          trainingpdfdata:String,
          userMassagesBackgroundColor:String,
          chatbotMassagesBackgroundColor:String
        },
        { collection: collectionName }
      );
      ChatbotModel = mongoose.model(collectionName, chatbotSchema);
    }

    // Delete chatbot by ID
    const deletedChatbot = await ChatbotModel.findByIdAndDelete(id);

    if (!deletedChatbot) {
      return res.status(404).json({ message: "Chatbot not found!" });
    }

    res.status(200).json({ message: "Chatbot deleted successfully!" });
  } catch (error) {
    console.error("Error deleting chatbot:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});
app.put("/api/chatbots/:userEmail/:id", async (req, res) => {
  try {
    const { userEmail, id } = req.params;
    const { chatbotName, greetingMessage, trainingData, trainingpdf, trainingpdfdata,userMassagesBackgroundColor,chatbotMassagesBackgroundColor } = req.body;

    // Validate ID
    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid chatbot ID" });
    }

    // Generate collection name based on user email
    const collectionName = userEmail.replace(/[@.]/g, "_");

    let ChatbotModel;
    if (mongoose.models[collectionName]) {
      ChatbotModel = mongoose.models[collectionName];
    } else {
      const chatbotSchema = new mongoose.Schema(
        {
          chatbotName: String,
          greetingMessage: String,
          trainingData: String,
          trainingpdf:String,
          trainingpdfdata:String,
          userMassagesBackgroundColor:String,
          chatbotMassagesBackgroundColor:String
        },
        { collection: collectionName }
      );
      ChatbotModel = mongoose.model(collectionName, chatbotSchema);
    }

    // Update chatbot data
    const updatedChatbot = await ChatbotModel.findByIdAndUpdate(
      id,
      { chatbotName, greetingMessage, trainingData,trainingpdf,trainingpdfdata,userMassagesBackgroundColor,chatbotMassagesBackgroundColor },
      { new: true }
    );

    if (!updatedChatbot) {
      return res.status(404).json({ message: "Chatbot not found!" });
    }

    res.status(200).json({ message: "Chatbot updated successfully!", updatedChatbot });
  } catch (error) {
    console.error("Error updating chatbot:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});



app.get("/api/find-object/:id", async (req, res) => {
  try {
    const objectId = req.params.id;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(objectId)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const objectIdToSearch = new mongoose.Types.ObjectId(objectId);
    const collections = await mongoose.connection.db.listCollections().toArray();

    if (!collections.length) {
      return res.status(404).json({ message: "No collections found." });
    }

    for (const collection of collections) {
      const collectionName = collection.name;
      const model = mongoose.connection.db.collection(collectionName);
      const data = await model.findOne({ _id: objectIdToSearch });

      if (data) {

        return res.status(200).json({ collection: collectionName, data });
      }
    }

    return res.status(404).json({ message: "No object found with this ID." });

  } catch (error) {
    console.error("Error fetching object:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Route to handle chatbot requests
app.post("/api/chatbot", async (req, res) => {
  try {
    const { userMessage, trainingData,trainingDatapdf } = req.body;

    // Make a request to OpenRouter
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: "google/gemma-3-27b-it:free",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant. Use the provided context to answer briefly. If question is related to the context and the answer is not in the context, respond with: 'Sorry, I don’t have enough information to answer that.'`,
          },
          {
            role: "system",
            content: `Here is some reference context data: ${trainingData}`,
          },
          {
            role: "system",
            content: `Here is some reference context from a PDF:\n${trainingDatapdf}`,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      },
      {
        headers: {
          "Authorization": `Bearer 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`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ botResponse: response.data.choices?.[0]?.message?.content || "No response & URL error" });

  } catch (error) {
    console.error("Error fetching response:", error);
    res.status(500).json({ error: "Internal Server Error & URL error" });
  }
});
app.post("/api/chatbotg", async(req, res) => {
    try {
        const { userMessage } = req.body;

        // Make a request to OpenRouter
        const response = await axios.post(
            OPENROUTER_API_URL, {
                model: "google/gemma-3-27b-it:free",
                messages: [{
                        role: "system",
                        content: `You are a helpful assistant. `,
                    },
                    {
                        role: "user",
                        content: userMessage,
                    },
                ],
            }, {
                headers: {
                    "Authorization": `Bearer sk - or - v1 - f0dc5a6b40b5f4d2aab60477481795387d577f922cde75417c02cc943a680d99 `,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ botResponse: response.data.choices ? .[0] ? .message ? .content || "No response & URL error" });

    } catch (error) {
        console.error("Error fetching response:", error);
        res.status(500).json({ error: "Internal Server Error & URL error" });
    }
});
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => .log(`Server running on port ${PORT}`));
