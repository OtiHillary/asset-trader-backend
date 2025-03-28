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

  if ( role == "all" ) {
    return {
      success: true
    }
  };

  const { data: userRoleData, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (roleError || !userRoleData) {
    return res.status(403).json({ message: "Forbidden - Role not found" });
  }

  const userRole = userRoleData.role;
  console.log(`the user with this role is an: ${userRole}`);

  // Check if user role matches the required role
  if (userRole !== role) {
    console.log('message: "Forbidden - Insufficient role');
    return res.status(403).json({ message: "Forbidden - Insufficient role" });
  }

  req.user = user;
  return { success: true };
}

const rolesRequired = (role) => {
  return async ( req, res, next ) => {
    try {
      let result = await checkRole(req, res, role)
      if (result?.success) {
        next();        
      }
    } catch (error) {
      console.error(error);
    }
  }
};


export { rolesRequired };
