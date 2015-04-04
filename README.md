Molko
====================
A REST API for retrieving the location of UK pharmacies

The raw data for this API can be obtained at: http://data.gov.uk/dataset/pharmacy-dispensaries

Data Cleaning
-
The data cleaning script takes the following columns from the raw file:

0	OrganisationCode

1	Name

2	NationalGrouping

3	HighLevelHealthGeography

4	Address 1

5	Address 2

6	Address 3

7	Address 4

8	Address 5

9	PostCode

12	StatusCode

13	OrganisationSubTypeCode

17	ContactTelephone

23	CurrentCareOrganisation 

Rows are only kept if the following conditions are true:

* WHERE StatusCode == "A" - we're only interested in active pharmacies
* WHERE OrganisationSubTypeCode == 1; - 1=Pharmacy, 2 = Appliance Contractor, 3 = Oxygen concentrator supplier. Again we're only interested in pharmacies
