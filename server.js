const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post('/login', (req, res) =>{
  try {
    const { username, password } = req.body
    //check for user in db here

    if ( username /*username found in db*/ ) {
      if (/*Hash.password == db.passwordHash*/ password ) {
        res.status(200).json({ message : "logged in successful" })        
      } else {
        res.status(400).json({ message : "incorrect username or password" })        
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
