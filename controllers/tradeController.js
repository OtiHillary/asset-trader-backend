const sendTrade = async (req, res) => {
  try {
    const { cardName, code} = req.body;
    // save details in db and send mail to admin
    res.status(200).json({ message: 'Login successful', user: data });
    
  } catch (error) {
    if (error) return res.status(400).json({ error: error.message });    
  }

}

const getTrades = async (req, res) => {
  //jwt should be sent here with request
  // decode jwt to get user
  try {
    // get trades from db pertaining to user
  } catch (error) {
    
  }
}

const getAllTrades = async (req, res) => {
  try {
    //jwt should be sent here with request
    // decode jwt to get user and make sure user is admin
    
  } catch (error) {
    
  }
}

export { sendTrade, getTrades, getAllTrades }