import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, Menu, Spin, Table, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import Home from "../../Pages/Home";
import { useEffect, useState } from "react";
import { getCart } from "../../API";

 

function AppHeader(){
    const navigate= useNavigate() 
     
   return ( 
    <div className="appHeader">
      <Menu
      className="appMenu"
        onClick={(menuItem) => navigate(menuItem.key)}
        mode="horizontal"
        items={[
            {
             label:<HomeFilled />,
             key:"",
             path:<Home />,
            },
            {
                label:"Men",
                key:"men",
                children:[
                {
                  label: "Men's Shirts" , 
                  key: "mens-shirt",
                  path:"category"
                },
                {
                    label: "Men's Shoes" , 
                    key: "mens-shoes",
                },
                {
                    label: "Men's Watches" , 
                    key: "mens-watches",
                },
            ],
            },
            {
                label:"Women",
                key:"women",
                children:[
                    {
                      label: "Women's Dresses" , 
                      key: "womens-dresses",
                    },
                    {
                        label: "Women's Shoes" , 
                        key: "womens-shoes",
                    },
                    {
                        label: "Women's Watches" , 
                        key: "womens-watches",
                    },
                    {
                        label: "Women's Bags" , 
                        key: "womens-bags",
                    },
                    {
                        label: "Women's Jewellery" , 
                        key: "womens-jewellery",
                    },
                ],
            },
            {
                label:"Fragrances",
                key:"fragrances",
            },
        ]}
        />
        <Typography.Title>Tonia Store</Typography.Title>
        <AppCart />
      </div>
    );
    function AppCart(){
         const [cartDrawerOpen, setCartDrawerOpen]= useState(false)
         const[checkoutDrawerOpen, setCheckoutDrawerOpen]=useState(false);
         const [cartItems,setCartItems]= useState([])
         useEffect(()=>{
            getCart().then(res=>{
                setCartItems(res.products)
            })
         },[]);
         const onConfirmOrder=(values)=>{
            console.log({values});
            setCartDrawerOpen(false)
            setCheckoutDrawerOpen(false)
            message.success("Your Order has been placed Successfully")
         }
        return(
<div>
    <Badge onClick={()=>{
        setCartDrawerOpen(true)
    }} count={cartItems.length} className="shoppingCartIcon">
        <ShoppingCartOutlined className="shoppingCartIcon" />
    </Badge>
    <Drawer open={cartDrawerOpen} onClose={()=> {
        setCartDrawerOpen(false)
    }} 
    title="Your Cart" 
    contentWrapperStyle={{width:500}}
    >
        <Table
        pagination={false}
        columns={[
        {
            title:'Title',
            dataIndex:'title' 
        },
        {
            title:'Price',
            dataIndex:'price',
            render: (value)=>{
                return <span>${value}</span>
            }
        },
        {
            title:'Quantity',
            dataIndex:'quantity',
            render: (value,record)=>{
                return <InputNumber 
                min={0} 
                defaultValue={value} onChange={(value)=>{
                   setCartItems((pre) => pre.map((cart)=>{
                        if(record.id === cart.id){
                            cart.total=cart.price*value
                        }
                        return(cart);
                    }))
                }} ></InputNumber>
            }
        },
        {
            title:'Total',
            dataIndex:'total'
        },
    ]}
       dataSource={cartItems} 
       summary={(data)=>{
        const total=data.reduce((pre,current)=>{
            return pre+current.total
        },0);
        return <span>Total: {total}</span>
       }}
        /> <br></br>
        <Button onClick={()=>{
            setCheckoutDrawerOpen(true)
        }} type="primary">
            Checkout Your Cart
        </Button>
    </Drawer>
    <Drawer open={checkoutDrawerOpen} onClose={()=>{
        setCheckoutDrawerOpen(false)
    }}>
        <Form onFinish={onConfirmOrder}>
            <Form.Item 
            rules={[
                {
                required:true,
                message:"Please Enter your Fullname",
            }
            ]} 
            label='Full Name' name='full_name'>
                <Input placeholder="Enter your fullname ..." />
            </Form.Item>
            <Form.Item 
            rules={[
                {
                required:true,
                type:'email',
                message:"Please Enter your Email",
            }
            ]} 
            label='Email' name='email'>
                <Input placeholder="Enter your email ..." />
            </Form.Item>
            <Form.Item
            rules={[
                {
                required:true,
                message:"Please Enter your Address",
            }
            ]} 
            label='Address' name='address'>
                <Input placeholder="Enter your address ..." />
            </Form.Item>
            <Form.Item>
                <Checkbox>Cash on Delivery</Checkbox>
            </Form.Item>
            <Button type="primary" htmlType="submit">Confirm Order</Button>
        </Form>

    </Drawer>
</div>
        )
    }
  }
  export default AppHeader;





  