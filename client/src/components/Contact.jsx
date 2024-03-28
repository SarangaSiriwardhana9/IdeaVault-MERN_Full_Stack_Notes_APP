/* eslint-disable no-unused-vars */
import React from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

export default function Contact() {
    const onFinish = (values) => {
        console.log('Received values:', values);
        // Add your logic to handle form submission (e.g., send email, store in database)
    };

    return (
        <div className="container mt-3  mx-auto  px-8 py-8 md:py-16">
            <h2 className="text-3xl md:text-4xl mb-10 text-center font-bold text-slate-600 py-3">
                Contact Us 📲
            </h2>
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 shadow-xl rounded-2xl ">
                    <p className="text-lg text-gray-800 mb-4">
                        Have a question or need support? Reach out to us using the form below or contact us directly.
                    </p>
                    <div className="flex items-center mb-4">
                        <MailOutlined className="text-xl mr-2" />
                        <span>Email: example@example.com</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <PhoneOutlined className="text-xl mr-2" />
                        <span>Phone: +1234567890</span>
                    </div>
                    <div className="flex items-center">
                        <EnvironmentOutlined className="text-xl mr-2" />
                        <span>Address: 123 Main Street, City, Country</span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl p-8 shadow-xl">
                    <Form
                        name="contactForm"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                            <Input placeholder="Your Name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please enter your email' }]}
                        >
                            <Input type="email" placeholder="Your Email" />
                        </Form.Item>
                        <Form.Item
                            name="message"
                            rules={[{ required: true, message: 'Please enter your message' }]}
                        >
                            <Input.TextArea placeholder="Your Message" />
                        </Form.Item>
                        
                        {/* Send Message Button */}
                        <button
                            type="submit"
                            className="bg-[#ffef94] hover:bg-[#fffeb4] shadow-lg text-slate-600 font-bold py-2 px-4 rounded-xl ml-2 mt-2 mb-4"
                        >
                            Send Message
                        </button>
                        


                    </Form>
                </div>
            </div>
        </div>
    )
}
