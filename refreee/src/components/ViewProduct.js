import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
} from '@chakra-ui/react';
import { MdLocalShipping } from 'react-icons/md';
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import { url } from "../api/api";
import Header from "./common/Header";

function ViewProduct() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    url(id)
      .then((res) => setData(res.data))
      .catch((error) => alert(error));
  }, [id]);

  return (
    <>

      <Header />
      {data ? (
    <Container maxW={'7xl'} className="viewproduct" key={data.id}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>

        <Carousel className="clider-img">
         {data.images && data.images.map((data)=>(
          <div >

          <img className="img-fluid" src={data} alt="nothing"/>
          </div>
          ))
              }
           </Carousel>

           
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {data.title}
            </Heading>
            <Text
        
              color={"gray.900"}
              _dark={{color:"gray.400"}}
              fontWeight={300}
              fontSize={'2xl'}>
              $ {data.price} USD
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                
              />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
          
              <Text fontSize={'lg'}>
                {data.description}
              </Text>
            </VStack>


            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Brand:
                  </Text>{' '}
                  {data.brand}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                  Category:
                  </Text>{' '}
                  {data.category}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                  Rating:
                  </Text>{' '}
                  {data.rating}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                  stock:
                  </Text>{' '}
                  {data.stock}
                </ListItem>
                <ListItem>
                  <Text className="fw-bold">
                    {data.discountPercentage} % OFF
                  </Text>{' '}
                 
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  

        
      ) : (
        <div className="loading">
          {" "}
          <BeatLoader color="#36d7b7" />
        </div>
      )}
    </>
  );
}

export default ViewProduct;
