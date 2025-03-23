import { supabase } from "../supabase/index.js";

const setRate = async (req, res) => {
    try {
      const { card_name, nairaRate, dollarRate } = req.body;
      if (!card_name || !card_code) {
        return res.status(400).json({ message: "card_name and card_code are required" });
      }
  
      const { data, error } = await supabase
        .from("rates")  
        .insert([{ card_name, nairaRate, dollarRate }])
  
      if (error) throw error;
  
      res.status(201).json({ message: "rate created successfully", data });
  
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
  
  }
  
  const setBulkRates = async (req, res) => {
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
  
  
  const getAllRates = async (req, res) => {
    try {
      const { data, error } = await supabase.from("rates").select("*");
  
      if (error) {
        console.error("Supabase Fetch Error:", error);
        throw error;
      }
  
      res.status(200).json({ message: "rates fetched successfully", data });
  
    } catch (error) {
      console.error("Database Error:", error);
      res.status(500).json({ message: "Database error", error: error.message });
    }
  };
  
  
  export { setRate, setBulkRates, getAllRates }