import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Icon1 } from "./1.svg";
import { ReactComponent as Icon2 } from "./2.svg";
import { ReactComponent as Icon3 } from "./3.svg";
import { ThemeContext } from "../../Context";
import "./HeroSection.css";

const ProductReel = ({ query, href, title }) => {
    return <div>Product Reel Placeholder</div>;
};

const MaxWidthWrapper = ({ children, className }) => {
    return (
        <div className={`max-w-screen-xl mx-auto ${className}`}>
            {children}
        </div>
    );
};

const buttonVariants = () => {
    return "Your Button Class";
};

const perks = [
    {
        name: "Quality You Can Trust",
        Icon: Icon1,
        desc: "Verified excellence ",
        description: "in every device for your confidence",
    },
    {
        name: "Be the First",
        Icon: Icon2,
        desc: "Early access ",
        description: "to cutting-edge devices for tech trendsetters",
    },
    {
        name: "Tailored Tech",
        Icon: Icon2,
        desc: "Curated devices ",
        description: "for your digital lifestyle",
    },
];

const HeroSection = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <>
            <MaxWidthWrapper>
                <div className={`hero-content ${theme ? "hero-dark-theme" : "hero-light-theme"}`}>
                    <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                        <h1 className={`text-4xl font-bold tracking-tight text-gray-${theme ? 100 : 900} sm:text-6xl`}>
                            Your marketplace for high-quality{" "}
                            <span className="text-blue-600">digital devices</span>.
                        </h1>
                        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                            Welcome to DigitalHippo. Every asset on our platform is verified by
                            our team to ensure our highest quality standards.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <Link to="/catalog" className="primary-btn">
                                Browse Trending
                            </Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>

            <section className={`${theme ? "dark-hero-section" : "bg-gray-50"}`}>
                <MaxWidthWrapper className="py-20">
                    <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
                        <div
                            className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                        >
                            <div className="md:flex-shrink-0 flex justify-center">
                                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                                    {<Icon1 className="w-1/3 h-1/3" />}
                                </div>
                            </div>

                            <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                                <h3 className={`text-base font-medium ${theme ? "dark-text" : "light-text"} `}>
                                    Quality You Can Trust
                                </h3>
                                <p className={`mt-3 text-sm text-2xl ${theme ? "dark-text" : "light-text"}`}>
                                    Verified excellence <span className="text-blue-500">in every device</span> for your confidence
                                </p>
                            </div>
                        </div>
                        <div
                            className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                        >
                            <div className="md:flex-shrink-0 flex justify-center">
                                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                                    {<Icon2 className="w-1/3 h-1/3" />}
                                </div>
                            </div>

                            <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                                <h3 className={`text-base font-medium ${theme ? "dark-text" : "light-text"} `}>
                                    Be the First
                                </h3>
                                <p className={`mt-3 text-sm text-2xl ${theme ? "dark-text" : "light-text"}`}>
                                    <span className="text-blue-500">Early access</span> to cutting-edge devices for tech trendsetters
                                </p>
                            </div>
                        </div>
                        <div
                            className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                        >
                            <div className="md:flex-shrink-0 flex justify-center">
                                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                                    {<Icon3 className="w-1/3 h-1/3" />}
                                </div>
                            </div>

                            <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                                <h3 className={`text-base font-medium ${theme ? "dark-text" : "light-text"} `}>
                                    Tailored Tech
                                </h3>
                                <p className={`mt-3 text-sm text-2xl ${theme ? "dark-text" : "light-text"}`}>
                                    Curated devices for your <span className="text-blue-500">digital lifestyle</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
};

export default HeroSection;
