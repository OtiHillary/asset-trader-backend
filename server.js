const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post('/login', (req, res) =>{
  try {
    const { email, password } = req.body
    //check for user in db here

    if ( email /*email found in db*/ ) {
      if (/*Hash.password == db.passwordHash*/ password ) {
        res.status(200).json({ message : "logged in successful", role: 'admin/user' })        
      } else {
        res.status(400).json({ message : "incorrect email or password" })        
      }
    } else {
      res.status(404).json({ message : "user does not exist" })        
    }

  } catch (error) {
    console.log(error)    
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
