// import React from "react";
// import { useSelector } from "react-redux";
// import EventCard from "../components/Events/EventCard";
// import Header from "../components/Layout/Header";
// import Loader from "../components/Layout/Loader";

// const EventsPage = () => {
//   const { allevents, isLoading } = useSelector((state) => state.event);
//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div>
//           <Header activeHeading={4} />
//           <EventCard active={true} data={allevents && allevents[0]} />
//         </div>
//       )}
//     </>
//   );
// };

// export default EventsPage;





import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";

const EventsPage = () => {
  const { allevents, isLoading } = useSelector((state) => state.event);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />

          <div className={`${styles.section} mt-6`}>
            <div className="w-full grid gap-4">
              {allevents && allevents.length > 0 ? (
                allevents.map((event) => (
                  <EventCard key={event._id} active={true} data={event} />
                ))
              ) : (
                <p className="text-[30px] text-center just min-h-screen text-[#F2A533] font-bold">
                  No Events Available!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
