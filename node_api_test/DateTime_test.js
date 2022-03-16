const { DateTime } = require("luxon");

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
  //returns next UTC Sunday 10 pm (Monday 6am PH Time) if Sunday to Tuesday and UTC Thursday 10pm if Wednesday to Saturday
  let now = DateTime.fromJSDate(new Date()).toUTC();
  now = now.set({ day: 28 });
  const currentHour = now.hour;
  // note: to make things easier nudge dates will be set to specific time in UTC (6am PH Time)
  // this sets the hour to 6am(PH Time) no matter what time its called and the date 1 week later
  // hour 10 or 10am(UTC) is 6pm(PH Time) so anything beyond that in UTC, 7 days is added
  // (e.g.  Sunday 7pm(PH Time) or Sunday 11am(UTC) should be stored as Next Monday 6am(PH Time) or Sunday 10pm(UTC) )
  // (e.g.  Monday 5pm(PH Time) or Monday 9am(UTC) should also be stored as Next Monday 6am(PH Time) or Sunday 10pm(UTC) )
  const currentDate = now.set({
    day: currentHour < 10 ? now.day + 6 : now.day + 7,
    hour: 22,
  });

  //const weekDay = (currentDate.weekday = 1 ? 0 : currentDate.weekday); //to simplify next conditional since DateTime uses 1 for Monday, 7 for Sunday, will turn Sunday to 0
  let weekDay = 0;
  if (currentDate.weekday !== 7) {
    weekDay = currentDate.weekday;
  }
  //console.log(currentDate.weekday);
  //console.log(weekDay);
  const nudgeDateOffset = weekDay < 3 ? -weekDay : 4 - weekDay;
  //console.log(nudgeDateOffset);
  const nudgeDate = currentDate.set({
    day: currentDate.day + nudgeDateOffset,
  });

  console.log("current UTC\t", now.month, now.day, now.hour, now.weekday);
  console.log(
    "nudge UTC\t",
    nudgeDate.month,
    nudgeDate.day,
    nudgeDate.hour,
    nudgeDate.weekday
  );
  let phtime2 = DateTime.fromISO(nudgeDate);
  let phtime = DateTime.fromISO(now);
  console.log(
    "current PHT\t",
    phtime.month,
    phtime.day,
    phtime.hour,
    phtime.weekday
  );
  console.log(
    "nudge PHT\t",
    phtime2.month,
    phtime2.day,
    phtime2.hour,
    phtime2.weekday
  );

  return nudgeDate.toJSDate();
};

//console.log(getNudgeDate());

const newnow = new Date();
let startTime = new Date();
for (let i = 0; i < 5; i++) {
  console.log(i);
}
let endTime = new Date();
//startTime.setHours(newnow.getHours() - 1);
//endTime.setHours(newnow.getHours() + 1);
console.log(endTime, startTime);
console.log(endTime > startTime);

//console.log(newnow, "\n", startTime, "\n", endTime);
