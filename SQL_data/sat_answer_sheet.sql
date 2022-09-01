CREATE TABLE `sat_answer_sheet` (
	`sat_id` TEXT(100),
	`section1` TEXT(100),
	`section2` TEXT(100),
	`section3` TEXT(100),
	`section31` TEXT(100),
	`section4` TEXT(100),
	`section41` TEXT(100)
);

INSERT INTO sat_answer_sheet VALUES(
	'Official #9 2019',
	'D,B,B,A,C,A,C,C,B,C,D,D,D,B,B,C,A,A,C,D,A,B,D,A,C,B,A,D,D,C,B,D,A,B,B,A,A,C,D,C,A,C,C,D,A,D,C,A,A,B,C,D',
	'B,B,A,C,D,C,D,A,D,C,A,C,B,B,D,A,C,D,C,C,B,D,B,B,B,D,A,D,B,D,A,D,A,A,C,D,B,D,C,C,C,A,D,C',
	'B,A,D,A,C,B,D,C,B,C,B,D,A,B,B',
	'360,2,8,3/4,5/2',
	'B,D,B,A,D,A,C,A,D,D,A,D,C,B,D,B,C,B,B,A,D,B,B,C,C,D,A,C,A,D',
	'6,2,8,9,15,3/2,1.3,3'
);

INSERT INTO sat_answer_sheet VALUES(
	'Official #10 2020',
	'A,B,D,B,A,A,D,C,C,B,D,A,A,B,C,C,D,C,B,B,D,D,B,A,C,C,B,D,A,D,A,B,C,B,B,D,C,A,A,B,D,A,A,B,D,C,A,B,C,A,C,D',
	'A,D,A,A,D,A,C,D,D,C,C,D,A,D,C,B,B,A,D,B,C,B,C,A,A,B,D,B,C,C,B,B,A,C,D,C,B,C,C,D,A,D,A,D',
	'B,C,B,C,A,A,D,C,C,D,A,B,C,B,A',
	'2200,5,1.21,2500,20',
	'B,A,B,C,C,D,B,C,C,D,A,C,C,A,B,C,D,C,D,C,B,D,A,B,A,D,A,D,D,A',
	'6,146,2500,34,5/2,25/4,293,9'
);