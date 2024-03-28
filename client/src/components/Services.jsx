/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import '../Font.css'

// for Why choose Idea Vault
import { MdOutlineSecurity } from "react-icons/md";
import { MdMobileFriendly } from "react-icons/md";
import { SiBookstack } from "react-icons/si";


export default function Services() {
    return (
        /* Why Choose Idea Vault with icons */
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="flex flex-col items-center justify-center mt-4 gap-8">
            <h2 className="my-text text-shadow-strong  text-3xl md:text-4xl font-bold text-slate-600 mb-4 py-3 text-shadow-inner">
  Why Choose Our Service? 
</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-3xl text-center  p-6 shadow-2xl flex flex-col items-center justify-center gap-2">
                        <MdOutlineSecurity className="text-4xl text-[#7c5836]" />
                        <h3 className="text-lg font-semibold text-gray-800">
                            Secure Transactions
                        </h3>
                        <p className="text-gray-700">
                            We ensure secure transactions to protect your financial information.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white text-center rounded-3xl p-6  shadow-2xl  flex flex-col items-center justify-center gap-2">
                        <MdMobileFriendly className="text-4xl text-[#7c5836]" />
                        <h3 className="text-lg font-semibold text-gray-800">
                            Mobile Accessibility
                        </h3>
                        <p className="text-gray-700">
                            Access our services on the go with our mobile-friendly platform.
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white text-center rounded-3xl p-6 shadow-2xl  flex flex-col items-center justify-center gap-2">
                        <SiBookstack className="text-4xl text-[#7c5836]" />
                        <h3 className="text-lg font-semibold text-gray-800">
                            Comprehensive Knowledge Base
                        </h3>
                        <p className="text-gray-700">
                            Our comprehensive knowledge base provides you with all the information you need.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}