import React from "react";

const PromoCard = ({ promo, openModal }) => {
  return (
    //<div className="relative bg-black-50 rounded-lg p-2 w-full sm:w-1/3 md:w-1/4 mb-6 mx-1 shadow-lg">
    <div className="relative bg-black-50 rounded-lg p-2 !pb-0 w-1/2 mb-6 px-2 shadow-lg">    
      <div className="roung overflow-hidden h-48">
        <img
          src={promo.image}
          alt={promo.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="bg-gray-900 bg-opacity-80 p-4">
        <h5 className="text-lg font-bold mb-2 text-white">{promo.title}</h5>
        <p className="mb-4 text-white">
          {promo.description.slice(0, 200)}
          {promo.description.length > 200 && "..."}
        </p>
        <button
          className="bg-transparent text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
          onClick={() => openModal(promo)}
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default PromoCard;



// import React from "react";

// const PromoCard = ({ promo, openModal }) => {
//   return (
//     <div
//       className="relative bg-cover bg-center text-white rounded-lg w-full sm:w-1/3 mb-6 mx-2 shadow-lg h-64"
//       style={{ backgroundImage: `url(${promo.image})` }}
//     >
//       {/* Overlay layer */}
//       <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>

//       {/* Content layer */}
//       <div className="relative p-4 flex flex-col justify-between h-full">
//         <div>
//           <h5 className="text-lg font-bold mb-2">{promo.title}</h5>
//           <p className="text-sm mb-4">
//             {promo.description.slice(0, 200)}
//             {promo.description.length > 200 && "..."}
//           </p>
//         </div>
//         <button
//           className="bg-transparent text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
//           onClick={() => openModal(promo)}
//         >
//           See More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PromoCard;

