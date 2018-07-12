const express =require('express');
const fs =require('fs');
const hbs =require('hbs');


var app =express();
hbs.registerPartials(__dirname+ '/views/partials')
app.set('view engine','hbs');



app.use((req,res,next) => {
    let now =new Date().toString();
    let log=`${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err)=>{
        if(err)
            console.log('Unable to append');
    })
    next();
});

app.use((req,res,next)=>{
    res.render('maintainance.hbs');
})
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text => {
    return text.toUpperCase();
}))
// app.get('/',(req,res) => {
//     // res.send('<h1>Hello Express</h1>');
//     res.send({
//         name:'yash',
//         age :23
//     });
// });
// app.get('/about',(req,res) =>{
//     res.send('About Page' );
//     // res.type('html');
// });

// app.get('/bad',(req,res) =>{
//     res.send({
//         erroMsg:'Something went bad'
//     });
// })
app.listen(3000, () => {
    console.log('Server is up');
});
app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle : 'About Page',
        // currentYear : new Date().getFullYear()
    }) ;
   
});
app.get('/',(req,res) =>{
    res.render('home.hbs',{
        pageTitle : 'Home Page',
        // currentYear : new Date().getFullYear(),
        welcomeMsg:'Hello There'
    }) ;
   
});