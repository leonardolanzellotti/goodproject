<?php

require 'vendor/autoload.php';
use Stichoza\GoogleTranslate\TranslateClient;

define("METADATA_SOURCE_GOOGLE", "https://www.google.com.br/search?sourceid=chrome&ie=UTF-8&q=");
define("METADATA_SOURCE_WIKIPEDIA", "https://pt.wikipedia.org/wiki/");
define("PUZZLE_CONTENT_LANGUAGE", "pt");

if (isset($_GET["type"]) && isset($_GET["data"])) {
	$data = $_GET["data"];
    $sourceLanguage = $_GET["sourceLanguage"];
	$targetLanguage = $_GET["targetLanguage"];
	
	switch ((int) $_GET["type"]) {
		case 0:
			$metadataService = new MetadataService();
			$metadataService->search($data);

		    $response = $metadataService->toUpperCase()->removeUnusefulTags()
				->removeNumbers()->replaceAccents()->removeSpecialChars()
				->toUpperCase()->groupSpaces()->removeQueryWords()->removeUnusefulNouns()
		        ->removeLittleWords()->groupSpaces()->removeDuplicatedWords()->getContent();

		    $arr = MetadataService::translateAssoc($response, $sourceLanguage, $targetLanguage);

		    echo json_encode($arr);
		break;
		case 1:
			$response = json_decode($data);
			if ($sourceLanguage != PUZZLE_CONTENT_LANGUAGE || $targetLanguage != PUZZLE_CONTENT_LANGUAGE) {
				$arr = MetadataService::translateAssoc($response, $sourceLanguage, $targetLanguage);
			} else {
				$arr = MetadataService::assoc($response, $response, $sourceLanguage, $targetLanguage);
			}

		    echo json_encode($arr);
		break;
	}   
}

class MetadataService {
	private $content = null;
	private $queryString = null;

	public function search ($queryString) {
    	$streamOptions = array("http"=> array("method"=>"GET"));
    	$context = stream_context_create($streamOptions);
        $this->content = file_get_contents(METADATA_SOURCE_GOOGLE . http_build_query(array($queryString)), false, $context, 0, 10000000);  
		//$this->content = file_get_contents(METADATA_SOURCE_WIKIPEDIA . $queryString, false, $context, 0, 10000000);	
		$this->content = utf8_encode($this->content);
		$this->queryString = strtoupper($queryString);
		return $this;
	}

	public function getContent () {
		return trim($this->content);
	}

	public function removeUnusefulTags () {
		$this->content = preg_replace("/<HEAD>.*<\/HEAD>/", "", $this->content);
		$this->content = preg_replace("/<STYLE>.*<\/STYLE>/", "", $this->content);
		$this->content = preg_replace("/<A.*<\/A>/", "", $this->content);
		$this->content = preg_replace("/<SCRIPT.*<\/SCRIPT>/", "", $this->content);
		$this->content = preg_replace("/<TABLE.*<\/TABLE>/", "", $this->content);
		$this->content = preg_replace("/\&NBSP/", " ", $this->content);
		$this->content = preg_replace("/(DOCTYPE|<DOCTYPE>|<HTML>|<\/HTML>|<BODY>|<\/BODY>|<DIV>|<\/DIV>|<SPAN>|<\/SPAN>|<B>|<\/B>|<BR>|<\/BR>|<UL>|<\/UL>|<OL>|<\/OL>|<LI>|<\/LI>)/", " ", $this->content);    		
		$this->content = preg_replace("/(<DIV[^>]*>|<H[^>]*>|<META[^>]*>|<BODY[^>]*>|<SPAN[^>]*>|<HTML[^>]*>|<OL[^>]*>|<LI[^>]*>)/", "", $this->content);
		return $this;
	}

	public function removeNumbers () {
		$this->content = preg_replace("/[0-9]/", " ", $this->content);
		return $this;
	}

	public function removeSpecialChars () {
		$this->content = preg_replace("/[\-\+\/\(\)\=\%\&\*\!\"\'\$\#\@\º\ª\,\.\;\:\>\<\n\r]/", " ", $this->content);
		return $this;
	}

	public function groupSpaces () {
		$this->content = preg_replace("/[ ]+/", " ", $this->content);
		return $this;
	}

	public function replaceAccents () {
		$accents = array(
			"Á|À|Ã|Â|Ä|á|à|ã|â|ä"	=>	"A", 
			"É|Ê|È|Ë|é|ê|è|ë"		=>	"E", 
			"Í|Î|í|î"				=>	"I",
			"Ó|Õ|Ô|Ö|Ò|ó|õ|ô|ö|ò"	=>	"O",
			"Ú|Û|Ü|ú|û|ü"			=>	"U",
			"Ç|ç"					=>	"C");

		$content = $this->content;
		foreach ($accents as $oldChar => $newChar) {
			$content = preg_replace("/$oldChar/i", "$newChar", $content);
		}
		$this->content = $content;
		return $this;
	}

	public function toUpperCase () {
		$this->content = strtoupper($this->content);
		return $this;
	}

	public function removeLittleWords () {
		$content = "";
		$words = explode(" ", $this->content);
		foreach ($words as $word) {
			if (strlen($word) >= 5) {
				$content = $content . " " . $word;
			}
		}    		
		$this->content = $content;
		return $this;
	}

	public function removeQueryWords () {
		$words = explode(" ", $this->queryString);
		foreach ($words as $word) {
			$this->content = preg_replace("/($word)/i", "", $this->content);
		}
		return $this;
	}

	public function removeUnusefulNouns () {
		$nouns = array("LONGE","PERTO","EU","TU","ELE","NOS","VOS","ELES","ELAS","VOCES","VOCE","
			MEU","MINHA","MEUS","MINHAS","TEU","TUA","TEUS","TUAS","NOSSO","NOSSA","NOSSOS","NOSSAS","VOSSO","VOSSA","VOSSOS","VOSSAS","SEU","SUA","
			SEUS","SUAS","ESTE","ESTA","ESTES","ESTAS","ISTO","ESSE","ESSA","ESSES","ESSAS","ISSO","QUAL","QUAIS","CUJO","CUJA","CUJOS","CUJAS","QUE","QUEM","ONDE","ALGUM","ALGUMA","
			ALGUNS","ALGUMAS","NENHUM","NENHUMA","NENHUNS","NENHUMAS","TODO","TODA","TODOS","TODAS","OUTRO","OUTRA","OUTROS","OUTRAS","MUITO","MUITA","MUITOS","MUITAS","POUCO","
			POUCA","POUCOS","POUCAS","CERTO","CERTA","CERTOS","CERTAS","TAMPOUCO","VARIOS","NOENTANTO","ENTANTO","ENQUANTO","VARIAS","TANTO","TANTA","TANTOS","TANTAS","QUANTO","QUANTA","QUANTOS","QUANTAS","QUALQUER","QUAISQUER","TAL","TAIS","UM","UMA","UNS","UMAS","ALGUEM","
			ALGO","NINGUEM","TUDO","OUTREM","NADA","CADA","A","ANTE","PERANTE","APOS","ATE","COM","CONTRA","DESDE","ENTRE","PARA","SEM","SOB","SOBRE","TRAS","
			ATRAS","DENTRO","PARACOM","AONDE","PREPOSICAO","PRONOMES","MAIS","MENOS","MENOR","MAIOR","IGUAL","EQUIVALENTE","DELE","DELES","DELAS","DESTE","DESTES","DESTA","DESTAS","DESSE","
			DESSES","DESSA","DESSAS","DAQUELE","DAQUELES","DAQUELA","DAQUELAS","DISTO","DISSO","DAQUILO","DAQUI","DAI","DALI","DOUTRO","DOUTROS","DOUTRA","DOUTRAS","
			NESTE","NESTES","NESTA","NESTAS","OBSTANTE","NESSE","NESSES","NAQUELE","NAQUELES","NAQUELANAQUELAS","NISTO","NISSO","NAQUILO","AQUELE","AQUELES","AQUELA","
			AQUELAS","AQUILO","A","AO","AOS","AS","DE","DO","DOS","DA","DAS","DUM","DUNS","DUMA","DUMAS","EM","NO","NOS","NA","NAS","NUM","NUNS","NUMA","NUMAS","POR","PER","
			PELO","PELOS","PELA","PELAS","PONTO","SERA","NUNCA","SEMPRE","ASVEZES","VEZES","CERCA","SAIBA","CLIQUE",
			"OUTRO","AINDA", "DEU", "DANDO", "DENTRE", "DENTRO", "TAMBEM", "ZEROHORA", "CIRCA");

		foreach ($nouns as $noun) {
			$this->content = preg_replace("/( $noun )/i", " ", $this->content);
		}
		return $this;
	}

    public function removeDuplicatedWords () {
        $this->content = implode(" ", array_unique(explode(" ", $this->content)));
        return $this;
    }

	public static function translate ($content, $source = "pt", $target = "en") {    		
		$tr = new TranslateClient();
		return $tr->setSource($source)->setTarget($target)->translate($content);
	}

    public static function translateAssoc ($sourceContent, $source = "pt", $target = "en") {    	
        $tr = new TranslateClient();
        $tr->setSource(PUZZLE_CONTENT_LANGUAGE);//--> O PUZZLE_CONTENT estará sempre em português.
        $tr->setTarget(($target == PUZZLE_CONTENT_LANGUAGE && $source != PUZZLE_CONTENT_LANGUAGE) ? $source : $target);
        $translationContent = implode("; ", $sourceContent);
        $translationContent = strtolower($translationContent);
        $translationContent = ucwords($translationContent);
        $translationContent = $tr->translate($translationContent);
        $translationContent = strtoupper($translationContent);
        $targetContent = explode("; ", $translationContent);
        
        return MetadataService::assoc($sourceContent, $targetContent, $source, $target);
    }

    public static function assoc ($sourceContent, $targetContent, $source = "pt", $target = "en") {    	
        $arr = array();

        for ($i = 0; $i < sizeof($sourceContent); $i++) {
        	$targetContent[$i] = preg_replace("/(\-)/i", " ", $targetContent[$i]);
        	if ($target == PUZZLE_CONTENT_LANGUAGE && $source != PUZZLE_CONTENT_LANGUAGE) {
                $arr[]= array($source => $targetContent[$i], $target => $sourceContent[$i]);
        	} else {
        		$arr[]= array($source => $sourceContent[$i], $target => $targetContent[$i]);
        	}
        }
        return $arr;
    }
}

?>