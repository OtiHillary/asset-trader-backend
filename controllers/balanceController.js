import { supabase } from "../supabase/index.js";

const withdrawToken = async (req, res) => {
    try {
        const { amount, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        console.log(`withdraw amount ${amount}`);

        const { data, error } = await supabase
            .from("token_wallet")
            .select("balance")
            .eq("owner", userId)
            .single()

        if (error) {
            console.error("Supabase error:", error);
            return res.status(500).json({ error: "Database query failed" });
        }

        if (!data) {
            return res.status(404).json({ error: "No balance found for this user" });
        }

        console.log("Balance fetched successfully:", data);

        res.status(200).json(data);

    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}


const clearbalance = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

export { withdrawToken, clearbalance }