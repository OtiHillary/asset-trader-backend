import { supabase } from "../supabase/index.js";

const getUser = async (req, res) => {
    const { userId } = req.body
    try {
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        return { success: true, message: "Transaction successful" };

    } catch (error) {
        console.error("Error performing task:", error);
        return { success: false, message: error.message };
    }
};

const getAccountDetails = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }


    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export { getAccountDetails, getUser }