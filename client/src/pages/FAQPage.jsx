// import React, { useState } from "react";
// import Header from "../components/Layout/Header";
// import Footer from "../components/Layout/Footer";
// import styles from "../styles/styles";

// const FAQPage = () => {
//   return (
//     <div>
//       <Header activeHeading={5} />
//       <FAQ />
//       <Footer />
//     </div>
//   );
// };

// const FAQ = () => {
//   const [activeTab, setActiveTab] = useState(0);

//   const toggleTab = (tab) => {
//     setActiveTab(activeTab === tab ? 0 : tab);
//   };

//   return (
//     <div className={`${styles.section} my-8`}>
//       <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>

//       <div className="mx-auto space-y-4">

//         <div className="border-b border-gray-200 pb-4">
//           <button
//             className="flex items-center justify-between w-full"
//             onClick={() => toggleTab(1)}
//           >
//             <span className="text-lg font-medium text-gray-900">
//               What is your return policy?
//             </span>
//             <span>{activeTab === 1 ? "-" : "+"}</span>
//           </button>
//           {activeTab === 1 && (
//             <div className="mt-4">
//               <p className="text-base text-gray-500">
//                 If you're not satisfied with your purchase, we accept returns
//                 within 30 days of delivery. Please email us at
//                 support@myshopOstore.com.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Q2 */}
//         <div className="border-b border-gray-200 pb-4">
//           <button
//             className="flex items-center justify-between w-full"
//             onClick={() => toggleTab(2)}
//           >
//             <span className="text-lg font-medium text-gray-900">
//               How do I track my order?
//             </span>
//             <span>{activeTab === 2 ? "-" : "+"}</span>
//           </button>
//           {activeTab === 2 && (
//             <div className="mt-4">
//               <p className="text-base text-gray-500">
//                 You can track your order by clicking the tracking link in your
//                 shipping confirmation email, or by logging into your account.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Q3 */}
//         <div className="border-b border-gray-200 pb-4">
//           <button
//             className="flex items-center justify-between w-full"
//             onClick={() => toggleTab(3)}
//           >
//             <span className="text-lg font-medium text-gray-900">
//               How do I contact customer support?
//             </span>
//             <span>{activeTab === 3 ? "-" : "+"}</span>
//           </button>
//           {activeTab === 3 && (
//             <div className="mt-4">
//               <p className="text-base text-gray-500">
//                 Email support@myecommercestore.com or call (555) 123-4567 between
//                 9am–5pm EST, Mon–Fri.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Q4 */}
//         <div className="border-b border-gray-200 pb-4">
//           <button
//             className="flex items-center justify-between w-full"
//             onClick={() => toggleTab(4)}
//           >
//             <span className="text-lg font-medium text-gray-900">
//               Can I change or cancel my order?
//             </span>
//             <span>{activeTab === 4 ? "-" : "+"}</span>
//           </button>
//           {activeTab === 4 && (
//             <div className="mt-4">
//               <p className="text-base text-gray-500">
//                 Once an order has been placed, we cannot make changes or
//                 cancellations. You may return items within 30 days of delivery.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Q5 */}
//         <div className="border-b border-gray-200 pb-4">
//           <button
//             className="flex items-center justify-between w-full"
//             onClick={() => toggleTab(5)}
//           >
//             <span className="text-lg font-medium text-gray-900">
//               Do you offer international shipping?
//             </span>
//             <span>{activeTab === 5 ? "-" : "+"}</span>
//           </button>
//           {activeTab === 5 && (
//             <div className="mt-4">
//               <p className="text-base text-gray-500">
//                 Currently, we only ship within the United States.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Q6 */}
//         <div className="border-b border-gray-200 pb-4">
//           <button
//             className="flex items-center justify-between w-full"
//             onClick={() => toggleTab(6)}
//           >
//             <span className="text-lg font-medium text-gray-900">
//               What payment methods do you accept?
//             </span>
//             <span>{activeTab === 6 ? "-" : "+"}</span>
//           </button>
//           {activeTab === 6 && (
//             <div className="mt-4">
//               <p className="text-base text-gray-500">
//                 We accept Visa, Mastercard, PayPal, and also offer Cash on
//                 Delivery.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQPage;





// FAQPage.jsx
import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/styles";

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <FAQ />
      <Footer />
    </div>
  );
};

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? 0 : tab);
  };

  const faqItems = [
    { id: 1, question: "What is your return policy?", answer: "If you're not satisfied with your purchase, we accept returns within 30 days of delivery. Please email us at support@myshopOstore.com." },
    { id: 2, question: "How do I track my order?", answer: "You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account." },
    { id: 3, question: "How do I contact customer support?", answer: "Email support@myecommercestore.com or call (555) 123-4567 between 9am–5pm EST, Mon–Fri." },
    { id: 4, question: "Can I change or cancel my order?", answer: "Once an order has been placed, we cannot make changes or cancellations. You may return items within 30 days of delivery." },
    { id: 5, question: "Do you offer international shipping?", answer: "Currently, we only ship within the United States." },
    { id: 6, question: "What payment methods do you accept?", answer: "We accept Visa, Mastercard, PayPal, and also offer Cash on Delivery." }
  ];

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold mb-8 text-center text-[#417fa0]">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col items-center space-y-4">
        {faqItems.map((item) => (
          <div
            key={item.id}
            className="w-full max-w-xl border border-[#B0E0E6] rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <button
              className="flex items-center justify-between w-full px-4 py-3 font-medium text-lg text-[#417fa0] hover:text-[#2f6280] transition-colors"
              onClick={() => toggleTab(item.id)}
            >
              <span>{item.question}</span>
              <span>{activeTab === item.id ? "-" : "+"}</span>
            </button>
            {activeTab === item.id && (
              <div className="px-4 py-3 bg-white text-gray-700">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
