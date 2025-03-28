import { supabase } from "../supabase/index.js";

async function checkRole (req, res, role) {
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

  if ( role == "all" ) next();

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
  req.user = user;
}

const rolesRequired = (role) => {
  return ( req, res, next ) => {
    try {
      checkRole(req, res, role)
      next();
    } catch (error) {
      console.error(error);
    }
  }
};


export { rolesRequired };
