import { supabase } from "../supabase/index.js";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();
const PSTACK_KEY = process.env.PSTACK_KEY

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
  const {  email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: 'Signup successful', user: data });
}

async function getBanks(req, res) {
  try {
    const response = await axios.get("https://api.paystack.co/bank", {
      headers: { Authorization: `Bearer ${PSTACK_KEY}` },
    });
    res.status(200).json(response.data.data);
  } catch (error) {
    console.error("Error fetching banks:", error);
  }
}

async function GetBankName(req, res) {
  const { accountNumber } = req.body;
  try {
    const response = await axios.get(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bank.code}`,
      { headers: { Authorization: `Bearer ${PSTACK_KEY}` } }
    );

    if (response.data.status) {
      res.status(200).json({ bankName: bank.name, accountName: response.data.data.account_name }) ;
    }

  } catch (error) {
    console.error("Error resolving account:", error );
  }
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

export { Login, Signup, EditAccount, GetBankName, getBanks }