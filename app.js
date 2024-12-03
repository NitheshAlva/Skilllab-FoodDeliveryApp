const express = require('express')
const cron = require('node-cron')

const app=express()
app.use(express.json())


const categories=['break-fast','snack','ice-cream','juice']
let menu=[]
let orders=[]
let idMap={}

app.post('/menu',(req,res)=>{
    const {name,price,category}=req.body
    // console.log(req.body)
    if(price>0&&categories.includes(category)){
        let flag=1
        menu.forEach((item)=>{
            if(item.name===name&&item.category===category){
                item.price=price
                flag=0
            }
        })
        if(flag)
            menu.push({name,category,price})
        return res.status(200).json({status:"success",data:`${name} succesfully added to the menu`})
    }
    else{
        return res.status(400).json({status:"error",error:`inavlid input for the menu`})
    }
})

app.get('/menu',(req,res)=>{
    if(menu.length==0){
        return res.json({status:"success",data:"No item in the menu"})
    }
    res.json({status:"success",data:menu})
})


app.post('/orders',(req,res)=>{
    let order=req.body.order,flag=1
    for(item of order){
        let x=menu.find(menuItems=>menuItems.name===item.name)
        if(!x){
            return res.status(400).json({status:"error",error:`${item.name} does not exist in the menu`})
        }
    }
    if(!flag)return;
    order={
        items:order,
        id:getId(),
        status:"Preparing",
        prepTime:Date.now()+getRandTime(1,4),
        deliveryTime:Date.now()+getRandTime(4,6)
    }
    orders.push(order)
    console.log(order)
    res.json({status:"success",data:{id:order.id}})
})


app.get('/orders/:id',(req,res)=>{
    // console.log(req.params)
    const id=parseInt(req.params.id)

    const order=orders.find(item=>item.id===id)
    if(order===undefined){
        return res.status(400).json({status:"error",error:"Invalid order ID"})
    }
    console.log(order)
    const data={
        id,
        items:order.items,
        status:order.status
    }

    res.json({status:"success",data})
})




app.listen(8000,()=>{
    console.log("app is listening on port https://localhost:8000")
})


const getId=()=>{
    while(true){
        let id = Math.floor(Math.random()*1000)
        if(!idMap[id]){
            idMap[id]=1
            return id
        }
    }
}

const getRandTime=(min,max)=>{
    return (Math.floor(Math.random()*(max-min))+min)*60*1000 
}

cron.schedule('* * * * *',()=>{
    const time=Date.now()
    orders=orders.map((order)=>{
        if(time<=new Date(order.deliveryTime)){
            order.status="Delivered"
        }
        else if(time<=new Date(order.prepTime)){
            order.status="Out for Delivery"
        }
    })
})
