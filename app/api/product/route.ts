import { NextApiResponse, NextApiRequest } from 'next';
import prisma from '@/app/prismadb';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const productId = req.query.productId as string;

        // Retrieve product from database
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(productId, 10)
            }
        });

        // Check if product exists
        if (product) {
            console.log("Product found:", product);
            return res.status(200).json(product);
        } else {
            console.log("Product not found");
            return res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
