const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let data = []
app.get('/', (req, res) => {
    res.render('add')
})
app.post('/addtask', (req, res) => {
    const { task, status, date } = req.body
    let obj = {
        id: Math.floor(Math.random() * 90000),
        task: task,
        status: status,
        date: date
    }
    data.push(obj)
    res.redirect('/view')
})
app.get('/view', (req, res) => {
    res.render('view', { data: data })
})

app.get('/deletetask', (req, res) => {
    const id = req.query.id;
    if (id) {
      const d = data.filter(val => val.id != id);
      data = d;
    } 
    res.redirect('/view')
  });
  app.get('/edittask', (req, res) => {
    const id =  Number(req.query.id);
      const editdata = data.find((val)=>{
        return val.id === id
      });
        res.render('edit', { editdata });
  });
  app.post('/updatetask', (req, res) => {
    const { id, task, status, date } = req.body;
    const numericId = Number(id); 
    const updatedata = data.map(val => {
        if (val.id === numericId) {
            val.task = task;
            val.status = status;
            val.date = date;
        }
        return val;
    });
    data = updatedata;
    res.redirect('/view');
});
  
app.listen(3000, (err) => {

})