/*eslint quotes:0*/

'use strict';

var util = module.exports;
var symbolnames = require('./symbol_names.json');


function clearRegionName(asciiname, cn, name) {
	switch (cn) {
		case "al":
			switch (asciiname) {
				case 'Qarku i Beratit':
					return 'Berat';
				case 'Qarku i Tiranes':
					return 'Tirana';
				case 'Qarku i Dibres':
					return 'Dibër';
				case 'Qarku i Elbasanit':
					return 'Elbasan';
				case 'Qarku i Gjirokastres':
					return 'Gjirokastër';
				case 'Qarku i Korces':
					return 'Korçë';
				case 'Qarku i Kukesit':
					return 'Kukës';
				case 'Qarku i Durresit':
					return 'Durrës';
				case 'Qarku i Fierit':
					return 'Fier';
				case 'Qarku i Lezhes':
					return 'Lezhë';
				case 'Qarku i Shkodres':
					return 'Shkodër';
				case 'Qarku i Vlores':
					return 'Vlora';
			}
			return name.replace("Qarku i ", "");
		case "mx":
			switch (name) {
				/*case "Estado de Mexico":
				    return "México";*/
				default: return name.replace("Estado de ", "");
			}
			break;
		case "sk":
			switch (asciiname) {
				case "Presovsky kraj":
					return "Prešov";
				case "Kosicky kraj":
					return "Košice";
				case "Nitriansky kraj":
					return "Nitra";
				case "Zilinsky kraj":
					return "Žilina";
				case "Banskobystricky kraj":
					return "Banská_Bystrica";
				case "Trenciansky kraj":
					return "Trenčín";
				case "Bratislavsky kraj":
					return "Bratislava";
				case "Trnavsky kraj":
					return "Trnava";
				default:
					return "Other";
			}
			break;
		case "hu":
			switch (name.toLowerCase()) {
				case "bekes county":
					return "Békés";
				case "borsod-abauj zemplen county":
					return "Borsod-Abaúj-Zemplén";
			}
			return name.replace(" főváros", "").replace(" fovaros", "").replace(" megye", "").replace(" county", "");
		case "lt":
			if (asciiname === "Republic of Lithuania") {
				return "Other";
			}
			return name;
		case "lv":
			return name;
			// return asciiname.replace("Jurmala", "Jurmala~")
			// 	.replace("Limbazu Rajons", "Limbažu")
			// 	.replace("Rigas Rajons", "Riga_fylke")
			// 	.replace("Incukalna Novads", "Incukalns")
			// 	.replace("Ventspils Rajons", "Ventspils_fylke")
			// 	.replace("Varaklanu Novads", "Varaklani")
			// 	.replace("Rezeknes Rajons", "Rezekne")
			// 	.replace(" Rajons", "")
			// 	.replace("s Novads", "")
			// 	.replace(" Novads", "")
			// 	.replace("Republic of Lithuania", "Other");
		case "ro":
			switch (asciiname) {
				case "Judetul Valcea":
					return "Vâlcea";
				case "Judetul Dambovita":
					return "Dâmbovita";
				default:
					return asciiname.replace("Judeţul ", "").replace("Municipiul ", "").replace("Judetul ", "");
			}
			break;
		case "it":
			switch (asciiname) {
				case "Sardegna":
					return "Sardinia";
				case "Regione Autonoma Valle d'Aosta":
					return "Aosta Valley";
				default:
					return asciiname.replace("Regione Autonoma ", "").replace("Regione ", "").replace("Provincia di ", "");
			}
			break;
		case "de":
			return asciiname.replace("Land ", "");
		case "dk":
			return asciiname.replace("Region ", "");
		case "be":
			return asciiname.replace("-Capitale", "");
		case "fi":
			return asciiname.replace("Province of ", "");
		case "pt":
			return asciiname.replace("Distrito de ", "");
		case "eg":
			return asciiname.replace("Muhafazat al Qahirah", "Cairo").replace("Muhafazat al ", "").replace("Le ", "");
		case "fr":
			return asciiname.replace("Region ", "").replace("Ile-de-France", "Île-de-France");
		case "bg":
			switch (asciiname.toLowerCase()) {
				case "oblast kurdzhali":
					return "kardzhali";
				case "oblast veliko turnovo":
					return "Veliko Tarnovo";
				case "oblast turgovishte":
					return "Targovishte";
			}
			return asciiname.replace("Oblast ", "");
		case "us":
			return asciiname.replace(", D. C.", "");
		case "md":
			if (asciiname === 'Laloveni') {
				return 'Ialoveni';
			}
			return asciiname.replace("Raionul ", "").replace("Unitatea Teritorială din Stînga Nistrului", "Transnistria").replace("Unitatea Teritoriala din Stinga Nistrului", "Transnistria").replace("Municipiul ", "").replace("Gagauzia", "Gagaus").replace("Municipiu ", "").replace("Unitate Teritorială Autonomă Găgăuzia", "Gagauzia").replace("Unitate Teritoriala Autonoma Gagauzia", "Gagaus").replace("ș", "s").replace("ş", "s").replace("ţ", "t").replace("Hincesti", "Hîncesti").replace("Riscani", "Rîscani").replace("Singerei", "Sîngerei").replace("Stefan Voda", "Stefan-Voda");

		case "ru":
			switch (asciiname) {
				case "Moskva":
					return "Moscow";
				case "Sverdlovskaya Oblast'":
					return "Sverdlovsk";
				case "Sankt-Peterburg":
					return "St._Petersburg";
				case "Leningradskaya Oblast'":
					return "Leningrad";
				case "Moskovskaya Oblast'":
					return "Moscow_oblast";
				case "Novosibirskaya Oblast'":
					return "Novosibirsk";
				case "Nizhegorodskaya Oblast'":
					return "Nizhny_Novgorod";
				case "Samarskaya Oblast'":
					return "Samara";
				case "Omskaya Oblast'":
					return "Omsk";
				case "Rostovskaya Oblast'":
					return "Rostov";
				case "Chelyabinskaya Oblast'":
					return "Chelyabinsk";
				case "Volgogradskaya Oblast'":
					return "Volgograd";
				case "Perm Krai":
					return "Perm";
				case "Krasnoyarskiy Kray":
					return "Krasnoyarsk";
				case "Saratovskaya Oblast'":
					return "Saratov";
				case "Voronezhskaya Oblast'":
					return "Voronezh";
				case "Krasnodarskiy Kray":
					return "Krasnodar";
				case "Ul'yanovskaya Oblast'":
					return "Ulyanovsk";
				case "Udmurtskaya Respublika":
					return "Udmurtia";
				case "Yaroslavskaya Oblast'":
					return "Yaroslavl";
				case "Altayskiy Kray":
					return "Altai_Krai";
				case "Primorskiy Kray":
					return "Primorsky";
				case "Irkutskaya Oblast'":
					return "Irkutsk";
				case "Khabarovskiy Kray":
					return "Khabarovsk";
				case "Orenburgskaya Oblast'":
					return "Orenburg";
				case "Ryazanskaya Oblast'":
					return "Ryazan";
				case "Tyumenskaya Oblast'":
					return "Tyumen";
				case "Lipetskaya Oblast'":
					return "Lipetsk";
				case "Penzenskaya Oblast'":
					return "Penza";
				case "Astrakhanskaya Oblast'":
					return "Astrakhan";
				case "Tomskaya Oblast'":
					return "Tomsk";
				case "Kemerovskaya Oblast'":
					return "Kemerovo";
				case "Tul'skaya Oblast'":
					return "Tula";
				case "Kirovskaya Oblast'":
					return "Kirov";
				case "Chuvashskaya Respublika":
					return "Chuvashia";
				case "Kaliningradskaya Oblast'":
					return "Kaliningrad";
				case "Bryanskaya Oblast'":
					return "Bryansk";
				case "Ivanovskaya Oblast'":
					return "Ivanovo";
				case "Kurskaya Oblast'":
					return "Kursk";
				case "Tverskaya Oblast'":
					return "Tver";
				case "Stavropol'skiy Kray":
					return "Stavropol";
				case "Respublika Buryatiya":
					return "Buryatia";
				case "Arkhangel'skaya Oblast'":
					return "Arkhangelsk";
				case "Belgorodskaya Oblast'":
					return "Belgorod";
				case "Kurganskaya Oblast'":
					return "Kurgan";
				case "Kaluzhskaya Oblast'":
					return "Kaluga";
				case "Orlovskaya Oblast'":
					return "Oryol";
				case "Smolenskaya Oblast'":
					return "Smolensk";
				case "Murmanskaya Oblast'":
					return "Murmansk";
				case "North Ossetia":
					return "North_Ossetia-Alania";
				case "Vladimirskaya Oblast'":
					return "Vladimir";
				case "Zabaykal'skiy Kray":
					return "Transbaikal"; //inexistent
				case "Respublika Mordoviya":
					return "Mordovia";
				case "Vologodskaya Oblast'":
					return "Vologda";
				case "Tambovskaya Oblast'":
					return "Tambov";
				case "Respublika Mariy-El":
					return "Mari_El";
				case "Kostromskaya Oblast'":
					return "Kostroma";
				case "Kabardino-Balkarskaya Respublika":
					return "Kabardino-Balkaria";
				case "Respublika Kareliya":
					return "Karelia";
				case "Respublika Sakha (Yakutiya)":
					return "Sakha";
				case "Chechenskaya Respublika":
					return "Chechnya";
				case "Amurskaya Oblast'":
					return "Amur";
				case "Novgorodskaya Oblast'":
					return "Novgorod";
				case "Pskovskaya Oblast'":
					return "Pskov";
				case "Kamtchatski Kray":
					return "Kamchatka";
				case "Sakhalinskaya Oblast'":
					return "Sakhalin";
				case "Respublika Khakasiya":
					return "Khakassia";
				case "Respublika Adygeya":
					return "Adygea";
				case "Karachayevo-Cherkesskaya Respublika":
					return "Karachay-Cherkessia";
				case "Respublika Kalmykiya":
					return "Kalmykia";
				case "Magadanskaya Oblast'":
					return "Magadan";
				case "Yevreyskaya Avtonomnaya Oblast'":
					return "Jewish_Autonomous_Oblast";
				case "Khanty-Mansiyskiy Avtonomnyy Okrug":
				case "Khanty-Mansiyskiy Avtonomnyy Okrug-Yugra":
					return "Khantia-Mansia";
				case "Respublika Altay":
					return "Altai";
				case "Yamalo-Nenetskiy Avtonomnyy Okrug":
					return "Yamalia";
				case "Nenetskiy Avtonomnyy Okrug":
					return "Nenetsia";
				case "Chukotskiy Avtonomnyy Okrug":
					return "Chukotka";
				case "Respublika Ingushetiya":
					return "Ingushetia";
				default:
					return asciiname.replace("Respublika ", "").replace(' Oblast\'', '').replace(' Oblast', '');
			}
			break;
		case "in":
			switch (asciiname) {
				case "State of Odisha":
					return "Orissa";
				case "Telangana":
					return "Andhra_Pradesh";
			}
			return asciiname.replace("State of ", "").replace("Union Territory of Puducherry", "Pondicherry").replace("Union Territory of ", "").replace("National Capital Territory of ", "");
		case "ua":
			switch (asciiname) {
				case "Kharkivs'ka Oblast'":
					return "Kharkiv";
				case "Dnipropetrovska Oblast'":
					return "Dnipropetrovsk";
				case "Donets'ka Oblast'":
					return "Donetsk";
				case "Odes'ka Oblast'":
					return "Odessa";
				case "Zaporiz'ka Oblast'":
					return "Zaporizjzja";
				case "L'vivs'ka Oblast'":
					return "Lviv";
				case "Mykolayivs'ka Oblast'":
					return "Mykolajiv";
				case "Luhans'ka Oblast'":
					return "Luhansk";
				case "Khmel'nyts'ka Oblast'":
					return "Khmelnytskyi";
				case "Misto Sevastopol'":
					return "Sevastopol";
				case "Avtonomna Respublika Krym":
					return "Crimea";
				case "Vinnyts'ka Oblast'":
					return "Vinnytsia";
				case "Khersons'ka Oblast'":
					return "Kherson";
				case "Poltavs'ka Oblast'":
					return "Poltava";
				case "Cherkas'ka Oblast'":
					return "Tjerkasy";
				case "Sums'ka Oblast'":
					return "Sumy";
				case "Kirovohrads'ka Oblast'":
					return "Kirovohrad";
				case "Chernivets'ka Oblast'":
					return "Tjernivtsi";
				case "Ternopil's'ka Oblast'":
					return "Ternopil";
				case "Volyns'ka Oblast'":
					return "Volyn";
				case "Ivano-Frankivs'ka Oblast'":
					return "Ivano-Frankivsk";
				case "Zakarpats'ka Oblast'":
					return "Zakarpattia";
				case "Misto Kyyiv":
					return "Kiev";
				default:
					return asciiname.replace("Misto ", "");
			}
			break;
		case "by":
			return asciiname.replace("Homyel'skaya Voblasts'", "Homel")
				.replace("Mahilyowskaya Voblasts'", "Minsk_fylke")
				.replace("Vitsyebskaya Voblasts'", "Vitsebsk")
				.replace("Hrodzyenskaya Voblasts'", "Hrodna")
				.replace("Brestskaya Voblasts'", "Brest")
				.replace("Minskaya Voblasts'", "Minsk");
		case "cz":
			switch (asciiname.toLowerCase()) {
				case "hlavni mesto praha":
					return "Praha";
				case "ustecky kraj":
					return "Ústí nad Labem";
				case "stredocesky kraj":
					return "Sentral-Böhmen";
				case "jihomoravsky kraj":
					return "South Moravia";
				case "olomoucky kraj":
					return "Olomouc";
				case "jihocesky kraj":
				case "ceske budejovice":
					return "South Bohemia";
				case "zlinsky kraj":
					return "Zlín";
				case "plzensky kraj":
					return "Plzeň";
				case "kralovehradecky kraj":
					return "Hradec Králové";
				case "kraj Vysocina":
					return "Vysočina";
				case "pardubicky kraj":
					return "Pardubice";
				case "liberecky kraj":
					return "Liberec";
				case "moravskoslezsky kraj":
					return "Moravia-Silesia";
				case "karlovarsky kraj":
					return "Karlovy Vary";
				case "kraj vysocina":
					return "vysocina";
				default:
					return asciiname.replace(" kraj", "").replace(" Kraj", "");
			}
			break;
		case "pl":
			switch (asciiname.toLowerCase().replace("wojewodztwo ", "")) {
				case "podlaskie":
					return "Podlachia";
				case "kujawsko-pomorskie":
					return "Kuyavian-Pomerania";
				case "slaskie":
					return "Silesia";
				case "pomorskie":
					return "Pomerania";
				case "swietokrzyskie":
					return "Swiety_Krzyz";
				case "lodzkie":
					return "Łódź";
				case "lubelskie":
					return "Lublin";
				case "mazowieckie":
					return "Masovia";
				case "warminsko-mazurskie":
					return "Warmia-Masuria";
				case "malopolskie":
					return "Lesser Poland";
				case "wielkopolskie":
					return "Greater Poland";
				case "podkarpackie":
					return "Subcarpathia";
				case "zachodniopomorskie":
					return "West Pomerania";
				case "dolnoslaskie":
					return "Lower Silesia";
				case "opolskie":
					return "opole";
				case "lubuskie":
					return "Lubusz";
			}
			break;
	}

	return asciiname;
}

function placeRegionName(place) {
	if (!place.weatherAdmName) {
		place.weatherAdmName = clearRegionName(place.asciiname, place.country_code, place.name).replace(/ /g, '_');
	}
	return place.weatherAdmName;
}

util.symbolName = function(symbol, lang) {
	if (!symbolnames[lang]) {
		return symbol.name;
	}
	return symbolnames[lang][symbol.number - 1];
};

util.weatherAdmName = function(place) {
	if (place.region) {
		return placeRegionName(place.region);
	}
	return placeRegionName(place);
};
