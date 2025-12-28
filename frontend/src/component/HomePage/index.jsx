import { CheckIcon } from "@heroicons/react/24/outline";
import supportGirlGif from "../../public/supportGirl.gif";
import { motion } from "framer-motion";

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.5,
      },
    },
  };

  return (
    <section className="w-full h-full min-h-[80vh] flex items-center">
      <main className="flex flex-col xl:flex-row h-full w-full p-10 xl:p-20 relative z-10 justify-between items-center gap-10 xl:gap-24">
        <motion.div 
          className="flex flex-col justify-center h-full gap-8 w-full max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight"
            variants={itemVariants}
          >
            Support Ticket <br/> System
          </motion.h1>
          
          <motion.div className="flex flex-col gap-6" variants={itemVariants}>
            <div className="flex gap-4 items-center bg-white/50 p-4 rounded-lg backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 border border-white/60">
              <div className="bg-blue-100 p-2 rounded-full">
                <CheckIcon className="size-6 text-blue-600" />
              </div>
              <p className="text-xl font-medium text-gray-700">Fast and simple ticket portal for employees.</p>
            </div>
            <div className="flex gap-4 items-center bg-white/50 p-4 rounded-lg backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 border border-white/60">
              <div className="bg-indigo-100 p-2 rounded-full">
                <CheckIcon className="size-6 text-indigo-600" />
              </div>
              <p className="text-xl font-medium text-gray-700">Centralized dashboard for effective management.</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-5">
            <a href="/login" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Get Started
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex justify-center items-center h-full w-full mt-10 xl:mt-0"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <img 
            src={supportGirlGif} 
            className="md:h-96 drop-shadow-2xl rounded-lg" 
            alt="Support Illustration"
          />
        </motion.div>
      </main>
    </section>
  );
}
