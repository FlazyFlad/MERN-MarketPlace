import React from 'react';
import Heading from '../Share/Heading';
import ProductCard from './ProductCard';
import Img1 from "../../assets/product/p-1.jpg";
import Img2 from "../../assets/product/p-2.jpg";
import Img3 from "../../assets/product/p-3.jpg";
import Img4 from "../../assets/product/p-4.jpg";
import Img5 from "../../assets/product/p-5.jpg";
import Img6 from "../../assets/product/p-9.jpg";
import Img7 from "../../assets/product/p-7.jpg";

const Products = () => {
    
    const ProductsData = [
        {
            id: 1,
            img: Img1,
            title: "Boat Headphone",
            price: "120 000",
            aosDelay: "0",
        },
        {
            id: 2,
            img: Img2,
            title: "Rocky Mountain",
            price: "420 000",
            aosDelay: "200",
        },
        {
            id: 3,
            img: Img3,
            title: "Goggles",
            price: "320 000",
            aosDelay: "400",
        },
        {
            id: 4,
            img: Img4,
            title: "Boat Headphone",
            price: "220 000",
            aosDelay: "600",
        },
    ]

    const ProductsData2 = [
        {
            id: 1,
            img: Img5,
            title: "Boat Headphone",
            price: "120 000",
            aosDelay: "0",
        },
        {
            id: 2,
            img: Img6,
            title: "Rocky Mountain",
            price: "420 000",
            aosDelay: "200",
        },
        {
            id: 3,
            img: Img7,
            title: "Goggles",
            price: "320 000",
            aosDelay: "400",
        },
        {
            id: 4,
            img: Img4,
            title: "Boat Headphone",
            price: "220 000",
            aosDelay: "600",
        },
    ]

    return (
        <div>
            <div className="container">
                {/* Header section */}
                <Heading
                title="Our Products"
                subtitle={"Explore Our Products"}
                />
                {/* Body Section */}
                <ProductCard data={ProductsData}></ProductCard>
                <ProductCard data={ProductsData2}></ProductCard>
            </div>
        </div>
    );
}

export default Products;
