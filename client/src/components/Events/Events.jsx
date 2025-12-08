import React, { useEffect } from 'react';
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from 'react-redux';
import { backend_url } from '../../server';
import { getAllEvents } from '../../redux/actions/event';



const Events = () => {
  const { allevents, isLoading } = useSelector((state) => state.event);
  const dispatch = useDispatch();

useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

    return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1 className="text-3xl text-[#417fa0] font-bold">Popular Events</h1>
      </div>

      <div className="w-full grid gap-4">
        {allevents && allevents.length > 0 ? (
          // allevents.map((event) => <EventCard data={event} key={event._id} />)
            allevents.slice(0, 1).map((event) => (
            <EventCard key={event._id} data={event} />
          ))
        ) : (
          <p className="text-[30px] text-center text-[#F2A533] font-bold">
            No Events Available!
          </p>
        )}
      </div>
    </div>
  );
};

export default Events;
