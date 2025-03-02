"use client"
import { parse } from 'date-fns';
import { differenceInDays } from 'date-fns';
import { addDays } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';

export default function DatePicker({ daydifferencevalue }) {

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);

  const handelDateChanges = (item) => {
    setDate([item.selection]);
  }

  useEffect(() => {
    if (date[0]?.startDate && date[0]?.endDate) {
     
      const difference = differenceInDays(date[0].endDate, date[0].startDate);
      daydifferencevalue(difference,date[0]?.startDate,date[0]?.endDate)
    }
  }, [date])

  return (
    <div className='mt-10 bg-[#FAFAFA]'>
      <div>
        <div className="">
          <DateRangePicker
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={date}
            direction="horizontal"
            onChange={handelDateChanges}
            minDate={new Date()}
          />
        </div>
      </div>
    </div>
  )
}
