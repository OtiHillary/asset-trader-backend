import { supabase } from "../supabase/index.js";

const withdrawToken = async (req, res) => {
  try {
    const { card_name, card_code, userId } = req.body;
    console.log("Request Body:", req.body); // ✅ Debugging: Log body

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

const clearbalance = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

export { withdrawToken, clearbalance }