import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const BuyCredit = () => {

  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext)

  const navigate = useNavigate()

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const {data} = await axios.post(backendUrl + '/api/user/verify-razor', response, {headers: token})

          if(data.success){
            loadCreditsData();
            navigate('/')
            toast.success('Credit Added')
          }

        } catch (error) {
          toast.error(error.message)
        }
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.open()

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  const paymentRazorpay = async (planId) => {
    try {
      if(!user) {
        setShowLogin(true)
      }
      const {data} = await axios.post(backendUrl + '/api/user/pay-razor', { planId }, { headers: { token } })

      if(data.success){
        initPay(data.order)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div className='min-h-[80vh] text-center pt-14 mb-10'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>
        Our Plans
      </button>
      <h1 className='text-3xl font-medium mb-6 sm:mb-10'>
        Choose the Plan
      </h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div
            key={index}
            className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500 min-w-[250px]'
          >
            <img width={40} src={assets.logo_icon} alt="Logo" />
            <p className='mt-3 mb-1 font-semibold text-lg'>{item.id}</p>
            <p className='text-sm mb-4'>{item.desc}</p>
            <p className='mt-4 text-gray-800'>
              <span className='text-3xl font-medium'>${item.price}</span> / {item.credits} credits
            </p>
            <button onClick={()=>paymentRazorpay(item.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5'>
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit
