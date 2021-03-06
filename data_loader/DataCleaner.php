<?php
$outJson = fopen("pharmacies.json", "w");

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

fclose($outJson);
fclose($handle);

function convertPostCodeToLatLong($postCode){
	$url = "http://api.postcodes.io/postcodes/$postCode";
	$data = file_get_contents($url);
	if($data !== FALSE){
		$postCodeData = json_decode($data);
		$lat = $postCodeData -> {'result'} ->{'latitude'};
		$long = $postCodeData -> {'result'} ->{'longitude'};
		return "[$lat,$long]";
	}else{
		echo "couldn't find: $postCode trying slower lookup";
		return slowerConvertPostCodeToLatLong($postCode);
	}
}

function slowerConvertPostCodeToLatLong($postCode){
	
	$postCode = str_replace(" ", "", $postCode);
	$url = "http://uk-postcodes.com/postcode/$postCode.csv";
	$data = file_get_contents($url);
	if($data !== FALSE){
		$postCodeData = explode(",", $data);
		return "[$postCodeData[1], $postCodeData[2]]";
	}
	else{
		error_log("Postcode not found: $postCode");
		echo "Postcode not found: $postCode";
		return "[null,null]";
	}
}

function formatPostCode($postCode){
	return str_replace(" ", "", $postCode);	
}

function convertLineToJson($line){
	$jsonRecord = 
	"{" . 
		"\"OrgCode\": \"$line[0]\"," .
		"\"Name\": \"$line[1]\"," .
		"\"NationalGrouping\": \"$line[2]\"," .
		"\"HighLevelHealthGeo\": \"$line[3]\"," .
		"\"Address1\": \"$line[4]\"," .
		"\"Address2\": \"$line[5]\"," .
		"\"Address3\": \"$line[6]\"," .
		"\"Address4\": \"$line[7]\"," .
		"\"Address5\": \"$line[8]\"," .
		"\"loc\":{\"type\": \"Point\", \"coordinates\": " . convertPostCodeToLatLong(formatPostCode($line[9])) . "}," .
		"\"PostCode\": \"$line[9]\"," .
		"\"StatusCode\": \"$line[12]\"," .
		"\"OrgSubTypeCode\": \"$line[13]\"," .
		"\"Tel\": \"$line[17]\"," .
		"\"CurrentCareOrg\": \"$line[23]\"" .
	"}";
	return $jsonRecord;
}

?>
