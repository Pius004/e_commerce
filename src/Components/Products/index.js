import { useEffect,useState } from "react";
import { addToCart, getAllProducts, getProductsByCategory } from "../../API";
import { Badge, Button, Card,Image,List, Rate, Select, Spin, Typography, message } from "antd";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useParams } from "react-router-dom";
function Products (){
    const [loading, setLoading] = useState(false)
    const param = useParams()
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder]=useState('az');
    useEffect(()=>{
        setLoading(true);
        (param?.categoryId ?
        getProductsByCategory(param.categoryId): getAllProducts())
         .then(res=>{
            setItems(res.products);
            setLoading(false)
        });
    },[param]);

 const getSortedItems =()=>{
    const sortedItems =[...items]
    sortedItems.sort((a,b)=>{
        if (sortOrder === 'az'){
            return(a.title>b.title ? 1: a.title === b.title ? 0:-1 )
        }
        else if (sortOrder === 'za'){
            return(a.title<b.title ? 1: a.title === b.title ? 0:-1 )
        }
       else if (sortOrder === 'lowHigh'){
            return(a.price>b.price ? 1: a.price === b.price ? 0:-1 )
        }
         else if (sortOrder === 'highLow'){
            return(a.price<b.price ? 1: a.price === b.price ? 0:-1 )
        }
    })
    return (sortedItems);
 }

    if(loading){
        return (
            <Spin spinning />
        )
    }
    return(
        <div className="productContainer">
            <div>
                <Typography.Text>View Items sorted by: </Typography.Text>
                <Select 
                onChange={(value)=>{
                setSortOrder(value)
                }}
                defaultValue={"az"}
                options={[
                    {
                    label: 'Alphabetically a-z',
                    value:'az'
                },
                {
                    label: 'Alphabetically z-a',
                    value:'za'
                },
                {
                    label: 'Price Low to High',
                    value:'lowHigh'
                },
                {
                    label: 'Price High to Low',
                    value:'highLow'
                },
                ]}></Select>
            </div>
        <List className="grid" 
        grid ={{column:4}}
        renderItem={(product,index)=>{
            return (
                <Badge.Ribbon className="itemCardBadge" text={product.discountPercentage} color="orange">
                    <Card
                className="itemCard"
                title={product.title} key={index}
                cover={
                <Image className="itemCardImage" src={product.thumbnail} />}
                actions={[
                    <Rate allowHalf disabled value={product.rating} />, 
                    <AddToCartButton item={product}  />
                ]}
                >
                    <Card.Meta title={
                    <Typography.Paragraph>
                        Price: ${product.price}{"       "}
                        <Typography.Text delete type="danger">
                            $
                            {parseFloat(product.price + 
                            (product.price * product.discountPercentage)/100).toFixed(2)}
                        </Typography.Text>
                    </Typography.Paragraph>
                }description={<Typography.Paragraph ellipsis= {{row:2, expandable:true, symbol:"more"}}>{product.description}</Typography.Paragraph>}
                >

                    </Card.Meta>
                </Card>
                </Badge.Ribbon>
                
            );
                
            
        }} dataSource={getSortedItems()}></List>
    </div>
    )
     
function AddToCartButton ({item}){
    const [loading, setLoading] = useState(false)
    const addProductToCart =()=>{
        setLoading(true)
        addToCart(item.id).then(res=>{
            message.success(`${item.title} has been added to the cart!`)
            setLoading(false)
        })
    }
    return(
        <Button type="link" onClick={()=>{
            addProductToCart()
        }} 
        loading={loading}
        >Add to cart</Button>
    )
}
}
export default Products;