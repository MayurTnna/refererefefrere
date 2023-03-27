
import { Card,Button, CardBody, CardFooter, Text, Stack,Image,Heading,Divider,ButtonGroup } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { AiFillStar } from 'react-icons/ai'
import { BeatLoader } from "react-spinners";
import { fetchposts } from "../redux/action/action";
import Pagination from 'react-bootstrap/Pagination';
import Header from "../components/common/Header";
import { Link } from 'react-router-dom';


function Product() {
  const [active, setActive] = useState(0);

  const items = useSelector((state) => state.posts);
 

  const handleIncrement = (number) => {
    setActive(number)
    dispatch(fetchposts((number) * 8))
  }
  const dispatch = useDispatch();

  let numitems = [];
  for (let number = 0; number < 100 / 8; number++) {
    numitems.push(
      <Pagination.Item key={number} active={active === number} onClick={() => handleIncrement(number)} >
        {number + 1}
      </Pagination.Item>,
    );
  }


  useEffect(() => {
    dispatch(fetchposts());
  }, [dispatch]);


  return (
    <>
      <Header />
      {
        <div className="row  gap-5 my-4 cart-row">
             {items.products ? items.products.map((item) => (
             <Card maxW='sm' key={item.id}>
              <CardBody>
                <Image
                  src={item.thumbnail}
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                  height="250px"
                  className='m-auto'
                />
                <Stack mt='6' spacing='3'>
                 <Heading size='md'>{item.title}</Heading>  
                  <div className=' text-aline'>
                  <Text >{item.category}</Text>
                  <Text >{item.brand}</Text>
                  </div>
                  <div className=' text-aline'>
                  <Text ><AiFillStar className='fillstar'/> {item.rating}</Text>
                  <Text className='text-success fw-bold'>{item.discountPercentage} % Off</Text>
                  </div>
                  <Text color='blue.600' fontSize='2xl'>
                   $ {item.price}
                  </Text>

                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link to={`/viewproduct/${item.id}`}>
                <ButtonGroup spacing='2'>
                  <Button variant='solid' colorScheme='blue'>
                   view
                  </Button>
                </ButtonGroup></Link>
              </CardFooter>
            </Card>
             

          ))
          : <div className="loading"> <BeatLoader color="#36d7b7" /></div>
          }

        </div>

      }
     <Pagination className="pagination-line">{numitems}</Pagination>
    </>
  );
}

export default Product;
