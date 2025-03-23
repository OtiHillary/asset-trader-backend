import { supabase } from "../supabase/index.js";

const Login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: 'Login successful', user: data });
}

const Signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: 'Signup successful', user: data });
}

const EditAccount = async (req, res) => {
  const { AccountName, AccountNumber, BankName } = req.body

  const { data, error } = await supabase
  .from("naira_account")
  .insert({
    AccountName,
    AccountNumber,
    BankName,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: 'Edit successful', user: data });
}

export { Login, Signup, EditAccount }