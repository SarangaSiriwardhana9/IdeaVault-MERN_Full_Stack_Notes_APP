/* eslint-disable no-unused-vars */
import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

const AppFooter = () => {
  return (

    <Footer className="bg-[#ffe792]  text-white text-center p-4"
    style={{
      textAlign: 'center',
    }}
  >
      <div className='text-center text-slate-600'>
    Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </div>
  </Footer>
  );
};

export default AppFooter;
