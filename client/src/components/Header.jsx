import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const { user, setShowLogin } = useContext(AppContext);
    const navigate = useNavigate();

    const onClickHandler = () => {
        if (user) {
            navigate('/result');
        } else {
            setShowLogin(true);
        }
    };

    return (
        <motion.div className='flex flex-col items-center justify-center text-center my-20 px-4'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <motion.div className='text-stone-500 inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-400 shadow-sm'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.8 }}
            >
                <p className='text-sm sm:text-base'>Best text to image generator</p>
                <img src={assets.star_icon} alt="Star Icon" className='w-5 h-5' />
            </motion.div>

            <motion.h1 className='text-4xl sm:text-6xl lg:text-7xl font-medium max-w-[90%] sm:max-w-[600px] mt-10 leading-tight tracking-tight'>
                Turn text to <span className='text-blue-600'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, }}
                    transition={{ delay: 0.4, duration: 2 }}
                >image</span> in seconds.
            </motion.h1>

            <motion.p className='text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mt-5 leading-relaxed tracking-wide'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}>
                Unleash your creativity with AI. Turn your imagination into visual art in seconds — just type and see the magic.
            </motion.p>

            <motion.button onClick={onClickHandler} className='mt-8 sm:text-lg text-white bg-black hover:bg-gray-800 transition duration-200 px-10 py-3 flex items-center gap-3 rounded-full shadow-md'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
            >
                Generate Images
                <img src={assets.star_group} alt="Star Group Icon" className='h-6 w-6' />
            </motion.button>

            <motion.div className='flex flex-wrap justify-center mt-16 gap-3'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}>
                {Array(6).fill('').map((item, index) => (
                    <motion.img
                        className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                        whileHover={{ scale: 1.05, duration: 0.1 }}
                        src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
                        alt=""
                        key={index}
                        width={70}
                    />
                ))}
            </motion.div>

            <motion.p className='mt-2 text-neutral-600'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}>Generated images from Imagify</motion.p>
        </motion.div>
    );
};

export default Header;
