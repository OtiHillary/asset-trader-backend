import { supabase } from "../supabase/index.js";

const rolesRequired = async (req, res, role, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // Decode token using Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const userId = user.id; // UUID from Supabase Auth

    // Query user_roles table to get the user's role
    const { data: userRoleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .single();

    if (roleError || !userRoleData) {
      return res.status(403).json({ message: "Forbidden - Role not found" });
    }

    const userRole = userRoleData.role;

    // Check if user role matches the required role
    if (userRole !== role) {
      return res.status(403).json({ message: "Forbidden - Insufficient role" });
    }

    // Attach user data to the request and proceed
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { rolesRequired };
