/* eslint-disable no-unused-vars */
import React from "react";

import { Link } from "react-router-dom";


// for Customer Testimonials
import { FaQuoteLeft } from "react-icons/fa";

import { Rate } from 'antd';
import { Avatar } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export default function Testimonials() {
    return ( <div className="container mx-auto px-4 py-8 md:py-16">
    <div className="flex flex-col items-center justify-center mt-4 gap-8">
      <h2 className=" my-text text-shadow-strong text-3xl md:text-4xl font-bold text-[#83674d] mb-4 py-3">
        Customer Testimonials 👩‍👩‍👦‍👦
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Testimonial 1 */}
        <div className="bg-white rounded-full  p-8 shadow-xl flex flex-col items-center justify-center gap-2">
          <FaQuoteLeft className="text-4xl text-[#7c5836]" />
          <p className="text-lg text-center font-semibold text-gray-800">
            &quot;I&apos;ve been using the service for a year now and it&apos;s been amazing! Highly recommended!&quot;
          </p>
          <Rate allowHalf defaultValue={4.5} disabled />
          <div className="flex items-center justify-center">
            <Avatar.Group maxCount={4}>
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
              <Avatar
                style={{
                  backgroundColor: '#f56a00',
                }}
              >
                K
              </Avatar>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{
                    backgroundColor: '#87d068',
                  }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
            </Avatar.Group>
          </div>
        </div>
        {/* Testimonial 2 */}
        <div className="bg-white rounded-full p-8 shadow-xl flex flex-col items-center justify-center gap-2">
          <FaQuoteLeft className="text-4xl text-[#7c5836]" />
          <p className="text-lg text-center font-semibold text-gray-800">
            &quot;The service helped me streamline my workflow and increase productivity. Thank you!&quot;
          </p>
          <Rate allowHalf defaultValue={4.5} disabled />
          <div className="flex items-center justify-center">
            <Avatar.Group maxCount={4}>
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" />
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=4" />
              <Avatar
                style={{
                  backgroundColor: '#f56a00',
                }}
              >
                K
              </Avatar>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{
                    backgroundColor: '#87d068',
                  }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
            </Avatar.Group>
          </div>
          </div>

          {/* Testimonial 3 */}
        <div className="bg-white rounded-full p-8 shadow-xl flex flex-col items-center justify-center gap-2">
          <FaQuoteLeft className="text-4xl text-[#7c5836]" />
          <p className="text-lg text-center font-semibold text-gray-800">
            &quot;I&apos;Excellent customer support and user-friendly interface. Couldn&apos;t be happier!
          </p>
          <Rate allowHalf defaultValue={4.5} disabled />
          <div className="flex items-center justify-center">
            <Avatar.Group maxCount={4}>
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=5" />
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=6" />
              <Avatar
                style={{
                  backgroundColor: '#f56a00',
                }}
              >
                K
              </Avatar>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{
                    backgroundColor: '#87d068',
                  }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
            </Avatar.Group>
          </div>
          </div>



        
      </div>
    </div>
  </div>)
}