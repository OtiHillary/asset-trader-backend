const sendTrade = async (req, res) => {
  try {
    const { card_name, card_code } = req.body;
    if (!card_name || !card_code) {
      return res.status(400).json({ message: "card_name and card_code are required" });
    }
    const done = false;

    const { data, error } = await supabase
      .from("trades")  
      .insert([{ card_name, card_code, done }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: "Trade created successfully", data });

  } catch (error) {
      res.status(500).json({ message: "Database error", error: error.message });
  }

}

const getTrades = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const { data, error } = await supabase
      .from("trades")
      .select("*")
      .eq("user", user_id);

    if (error) {
      console.error("Supabase Fetch Error:", error);
      throw error;
    }

    res.status(200).json({ message: "User trades fetched successfully", data });

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

    res.status(200).json({ message: "Trades fetched successfully", data });

  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Database error", error: error.message });
  }
};


export { sendTrade, getTrades, getAllTrades }