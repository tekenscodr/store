import { Prisma } from '@prisma/client'
import { NextResponse } from "next/server"
import { NextApiResponse, NextApiRequest } from 'next';


export async function POST(request:Request){
    const body = await request.json()
    const {
        name,
        email,
        user,
        product,
        amount,
    } = body;
    const url = "https://api.paystack.co/transaction/initialize";
    const authorization = "Bearer sk_test_d4061fac60668a5522d7eddc0633749888de3b57";
    const contentType = "application/json";
    const data = {
      email: email,
      amount: (parseFloat(amount) * 100).toString()
    }
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: authorization,
          "Content-Type": contentType
        },
        body: JSON.stringify(data)
      });
      console.log(data)
      const responseData = await response.json();
      console.log(data)
      return NextResponse.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.error()    
    }
  }

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const reference = req.query.reference as string; // Get the reference from the query parameters
    
    const url = `https://api.paystack.co/transaction/verify/${reference}`;
    const authorization = "Bearer YOUR_SECRET_KEY"; // Replace with your actual secret key
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: authorization
        }
      });
  
      const responseData = await response.json();
      res.status(200).json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
  
  