<?php
$outJson = fopen("pharmacies.json", "w");

fwrite($outJson, "[");
$row = 1;
if(($handle = fopen("../raw_data/edispensary.csv", "r")) !== FALSE){
	while(($line = fgetcsv($handle, 0, ",")) !== FALSE){
		
		if($line[12] == "A" && $line[13]==1){
			$recordPrefix = "";
			if($row > 1){
				$recordPrefix = ",\n";
			}

			fwrite($outJson, $recordPrefix . convertLineToJson($line));
		}
		$row++;
	}
}
fwrite($outJson, "]");

fclose($outJson);
fclose($handle);

function convertPostCodeToLatLong($postCode){
	$postCode = str_replace(" ", "", $postCode);
	$url = "http://uk-postcodes.com/postcode/$postCode.csv"; 
	$postCodeData = explode(",", file_get_contents($url));
	return "[$postCodeData[1], $postCodeData[2]]";
}

function convertLineToJson($line){
	$jsonRecord = 
	"{" . 
		"OrgCode: \"$line[0]\"," .
		"Name: \"$line[1]\"," .
		"NationalGrouping: \"$line[2]\"," .
		"HighLevelHealthGeo: \"$line[3]\"," .
		"Address1: \"$line[4]\"," .
		"Address2: \"$line[5]\"," .
		"Address3: \"$line[6]\"," .
		"Address4: \"$line[7]\"," .
		"Address5: \"$line[8]\"," .
		"loc:{type: \"Point\", coordinates: " . convertPostCodeToLatLong($line[9]) . "}," .
		"PostCode: \"$line[9]\"," .
		"StatusCode: \"$line[12]\"," .
		"OrgSubTypeCode: \"$line[13]\"," .
		"Tel: \"$line[17]\"," .
		"CurrentCareOrg: \"$line[23]\"" .
	"}";
	return $jsonRecord;
}

?>
