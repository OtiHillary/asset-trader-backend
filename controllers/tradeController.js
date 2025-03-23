import { supabase } from "../supabase/index.js";

const sendTrade = async (req, res) => {
  try {
    const { card_name, card_code, userId } = req.body;
    console.log("Request Body:", req.body); // ✅ Debugging: Log body
    // console.log("Uploaded File:", req.file); // ✅ Debugging: Log file

    if (!card_name || !card_code) {
      return res.status(400).json({ message: "card_name and card_code are required" });
    }
    const done = false;

    const { data, error } = await supabase
      .from("trades")  
      .insert([{ card_name, card_code, done, user: userId }])
      .select();

      if (error) {
        console.error("Supabase Fetch Error:", error);
        res.status(500).json({ message: "Database error", error: error.message });
      }

    res.status(200).json(data);

  } catch (error) {
      res.status(500).json({ message: "Database error", error: error.message });
  }

}

const getTrades = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const { data, error } = await supabase
      .from("trades")
      .select("*")
      .eq("user", userId);

    if (error) {
      console.error("Supabase Fetch Error:", error);
      throw error;
    }

    res.status(200).json(data);

  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

const getAllTrades = async (req, res) => {
  try {
    const { data, error } = await supabase.from("trades").select("*");

    if (error) {
      console.error("Supabase Fetch Error:", error);
      throw error;
    }

    res.status(200).json(data);

  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

const completeTrade = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}


export { sendTrade, getTrades, getAllTrades, completeTrade }