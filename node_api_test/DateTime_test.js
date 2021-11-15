const { DateTime } = require('luxon');

/*
//const dt = DateTime.local(2017, 5, 15, 8, 30);
//const dt = DateTime.now();
let dt = DateTime.fromISO( DateTime.now() );
//dt = dt.set({hour: 12});
//dt = dt.plus({hour: });          
let now = DateTime.fromJSDate(new Date(), {zone: 'utc'});
now = now.set({hour: 9})


          // note: to make things easier nudge dates will be set to specific time in UTC (6am PH Time)
          // this sets the hour to 6am(PH Time) no matter what time its called and the date 1 week later
          // hour 16 or 4pm(UTC) is 12mn(PH Time) so anything beyond that in UTC, only 6 days is added
          // (e.g.  Monday 11pm(PH Time) or Monday 3pm(UTC) should be stored as Next Monday 6am(PH Time) or Sunday 10pm(UTC) )
          // (e.g.  Monday 1am(PH Time) or Sunday 5pm(UTC) should also be stored as Next Monday 6am(PH Time) or Sunday 10pm(UTC) )


const timeDifference = now.hour;
const nudgeDate = now.set({
	day:timeDifference < 10? now.day+6 : now.day+7 ,
	hour:22,
});

console.log( "current UTC\t", now.month, now.day, now.hour );
console.log( "nudge UTC\t", nudgeDate.month, nudgeDate.day, nudgeDate.hour );
let phtime2 = (DateTime.fromISO(nudgeDate));
let phtime = (DateTime.fromISO(now));
console.log( "current PHT\t", phtime.month, phtime.day, phtime.hour );
console.log( "nudge PHT\t", phtime2.month, phtime2.day, phtime2.hour );
*/

const getNudgeDate = () => {
  let now = DateTime.fromJSDate(new Date()).toUTC();
  const currentHour = now.hour;
  // note: to make things easier nudge dates will be set to specific time in UTC (6am PH Time)
  // this sets the hour to 6am(PH Time) no matter what time its called and the date 1 week later
  // hour 10 or 10am(UTC) is 6pm(PH Time) so anything beyond that in UTC, 7 days is added
  // (e.g.  Sunday 7pm(PH Time) or Sunday 11am(UTC) should be stored as Next Monday 6am(PH Time) or Sunday 10pm(UTC) )
  // (e.g.  Monday 5pm(PH Time) or Monday 9am(UTC) should also be stored as Next Monday 6am(PH Time) or Sunday 10pm(UTC) )
  const nudgeDate = now.set({
    day: currentHour < 10 ? now.day + 6 : now.day + 7,
    hour: 22,
  });
  return nudgeDate.toJSDate();
};

console.log( getNudgeDate() );