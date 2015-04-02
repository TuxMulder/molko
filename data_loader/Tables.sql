CREATE TABLE Pharmacy(
	PharmacyId INTEGER PRIMARY KEY NOT NULL,

);

0	OrganisationCode,
1	Name,
2	NationalGrouping,
3	HighLevelHealthGeography,
4	Address 1
5	Address 2
6	Address 3
7	Address 4
8	Address 5,
9	PostCode,
12	StatusCode -> WHERE ="A" - "P" is another option; proposed, but is less useful,
13	OrganisationSubTypeCode -> WHERE = 1; 1=Pharmacy, 2 = Appliance Contractor, 3 = Oxygen concentrator supplier
17	ContactTelephone,
23	CurrentCareOrganisation <- not sure what it is yet, but it could link to a Primary Care Organisation, which might be useful down the line,


Read in each line
split on ','
filter based on indicies above,
stuff into json
add to json array/file
------------
Read in json file
load each record into mongoDb
geospatially index the data


