import React from 'react'
import { Box, Stack } from "@chakra-ui/react"
import Card from './Card'
import axios from "axios";


const Home = () => {


    const checkoutHandler = async (amount) => {

        const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")

        const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
            amount
        })

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Testing integration",
            description: "RazorPay",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkms62ywj8noI96YorLX4kg6qHaHcq5lhoj_VYj9I0-A&s",
            order_id: order.id,
            callback_url: "http://localhost:4000/api/paymentverification",
            prefill: {
                name: "Karuna B",
                email: "karuna.b@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "exapmle Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    return (
        <Box>

            <Stack h={"100vh"} alignItems="center" justifyContent="center" direction={["column", "row"]}>

                <Card amount={50} img={"https://www.rushlane.com/wp-content/uploads/2020/12/ola-electric-scooter-new-zealand.jpg"} checkoutHandler={checkoutHandler} />
                <Card amount={30} img={"https://images.firstpost.com/wp-content/uploads/2021/08/ola-electric-scooter-launch-date-announced.jpg"} checkoutHandler={checkoutHandler} />

            </Stack>
        </Box>
    )
}

export default Home