/*
let coacheSet = new Set();

for (let i = 0; i<5; i++){
	coacheSet.add( 1 );
	coacheSet.add( i );
}

let coaches = [...coacheSet];
*/

let coach_dict = { 'name': [] };
let nam = 'name';
/*
try{ coach_dict[nam].push('hi');
}catch(e){ coach_dict[nam] = ['hi'];
}
nam = 'test';
try{ coach_dict[nam].push('test');
}catch(e){ coach_dict[nam] = ['hi'];
}
*/

if (coach_dict[nam]){
coach_dict[nam].push('hello');
} else {
coach_dict[nam] = ['hi'];
}

for (var key in coach_dict){
	console.log(key, coach_dict[nam][0]);
}
