import { ethers } from "ethers";
import { supabase } from "../supabase/index.js";
import { encryptPrivateKey, decryptPrivateKey } from "../util/encrypt.js";
import dotenv from 'dotenv';
dotenv.config();

const projectID = process.env.PROJECT_ID
const rpcUrls = {
    ethereum: `https://mainnet.infura.io/v3/${projectID}`,
    bsc: "https://bsc-dataseed.binance.org/"
};    

const usdtContracts = {
    ethereum: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    bsc: "0x55d398326f99059ff775485246999027b3197955"
};

const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)"
];

const createAsset = async (req, res) => {
    try {
        const { userId } = req.body
        
        // Generate Ethereum wallet (can also be used for BSC USDT)
        const wallet = ethers.Wallet.createRandom();
        const walletAddress = wallet.address;
        const privateKey = wallet.privateKey;  // NEVER store this in a database!

        // Save wallet address in Supabase
        const { data, error } = await supabase
            .from("crypto_wallet")
            .insert([{ wallet_address: walletAddress, currency: "USDT", blockchain: "ethereum", owner: userId, pkey: encryptPrivateKey(privateKey) }]);

        if (error) {
            console.error("Supabase error:", error);
            return res.status(500).json({ error: "Database query failed" });
        }

        return res.status(201).json({
            message: "USDT Wallet created successfully on Ethereum",
            wallet: { walletAddress, blockchain: "ethereum" }
        });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const getCryptoBalance = async (req, res) => {
    try {
        const { userId } = req.body

        const { data, error } = await supabase
        .from("crypto_wallet")
        .select("wallet_address, currency, blockchain")
        .eq("owner", userId)
        .single();

        if (error) {
            console.error("Supabase error:", error);
            return res.status(500).json({ error: "Database query failed" });
        }

        const provider = new ethers.JsonRpcProvider(rpcUrls[data.blockchain]);
        const usdtContract = new ethers.Contract(usdtContracts[data.blockchain], ERC20_ABI, provider);
        const balance = await usdtContract.balanceOf( data.wallet_address );
        console.log('balance is:', balance);
        
        res.status(200).json({ balance: ethers.formatUnits(balance, 6) });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Database query failed" });
    }
}

const sendFromCrypto = async (req, res) => {
    const { userId, recipientAddress, amount } = req.body
    try {
        // Fetch sender's wallet from Supabase
        const { data, error } = await supabase
            .from("crypto_wallet")
            .select("wallet_address, pkey")
            .eq("owner", userId)
            .single();

        if (error || !data) {
            console.error("Error fetching wallet:", error);
            return { success: false, message: "Wallet not found" };
        }

        const senderWalletAddress = data.wallet_address;
        const encryptedPrivateKey = data.pkey;

        // Decrypt the private key
        const privateKey = decryptPrivateKey(encryptedPrivateKey); // Implement this function securely

        // Initialize provider and wallet signer
        const provider = new ethers.JsonRpcProvider(RPC_URLS[data.blockchain]);
        const wallet = new ethers.Wallet(privateKey, provider);

        // Initialize USDT contract
        const usdtContract = new ethers.Contract(USDT_CONTRACTS[data.blockchain], ERC20_ABI, wallet);

        // Convert amount to smallest unit (USDT uses 6 decimals)
        const amountInWei = ethers.parseUnits(amount.toString(), 6);

        // Send transaction
        const tx = await usdtContract.transfer(recipientAddress, amountInWei);
        console.log("Transaction Hash:", tx.hash);

        // Wait for confirmation
        await tx.wait();
        console.log("Transaction Confirmed!");

        return { success: true, message: "Transaction successful", txHash: tx.hash };

    } catch (error) {
        console.error("Error sending USDT:", error);
        return { success: false, message: error.message };
    }
};

const getTokenBalance = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        console.log("Fetching balance for userId:", userId);

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
};

export { createAsset, getCryptoBalance, getTokenBalance, sendFromCrypto }