const authRoutes=require("./routes/authRoutes");
const bookRoutes=require("./routes/bookRoutes");
const exchangeRoutes=require("./routes/echangeRoutes");
app.use("./app/auth",authRoutes);
app.use("./app/book",bookRoutes);
app.use("./app/exchange",exchangeRoutes);
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

})
.then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error(err));