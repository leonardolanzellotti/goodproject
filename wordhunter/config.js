const LETTER_WIDTH = {
	"NORMAL": 16,
	"BIG": 21
};
const LETTER_SPACE_TABLE_WIDTH = 32;//26;
const LETTER_SPACE_SCOPE_WIDTH = 20;
const TABLE_MARGIN = 10;
const SCOPE_MARGIN = 20;
const SCOPE_HEIGHT = 100;
const FIRST_LETTER_INDEX = 33;
const WORD_DIRECTIONS = [
	{dRow: 0, dCol: 1, level: 1},//--> 		HORIZONTAL DA ESQUERDA PARA DIREITA.
	{dRow: 0, dCol: -1, level: 2},//--> 	HORIZONTAL DA DIREITA PARA ESQUERDA.
	{dRow: 1, dCol: 0, level: 1},//--> 		VERTICAL DE CIMA PARA BAIXO
	{dRow: -1, dCol: 0, level: 2},//--> 	VERTICAL DE BAIXO PARA CIMA.
	{dRow: 1, dCol: 1, level: 3},//--> 		DIAGONAL DE CIMA PARA BAIXO APONTANDO PARA DIREITA.
	{dRow: -1, dCol: 1, level: 3},//--> 	DIAGONAL DE BAIXO PARA CIMA APONTANDO PARA DIREITA.
	{dRow: 1, dCol: -1, level: 3},//--> 	DIAGONAL DE CIMA PARA BAIXO APONTANDO PARA ESQUERDA.
	{dRow: -1, dCol: -1, level: 3}//--> 	DIAGONAL DE BAIXO PARA CIMA APONTANDO PARA ESQUERDA.
];

const BACKGROUND_COLOR = "#dde";

const SELECTION_COLOR = "#ccf";
const SELECTED_COLOR = "#7b241c";
const UNSELECTED_COLOR = "transparent";
const BG_TIMER_COLOR = "#cb4335";
const FG_TIMER_COLOR = "#1abc9c";

const LANGUAGES = [
	{"text" : "Português", "value" : "pt"},
	{"text" : "Inglês", "value" : "en"}];

const DIFICULTIES = [
	{"text" : "Fácil", "value" : 1},
	{"text" : "Médio", "value" : 2},
	{"text" : "Dificil", "value" : 3}];

const LETTERS = [
		"A", "B", "C", "D", "E", 
		"F", "G", "H", "I", "J", 
		"K", "L", "M", "N", "O", 
		"P", "Q", "R", "S", "T", 
		"U", "V", "W", "X", "Y", 
		"Z", " "];

const GAME_STATUS = {
	PLAYING: 0,
	PAUSED: 1,
	MAIN_SCREEN: 2,
	FINISH_ROUND: 3
};

const ROUND_TIME = {
	"1": 120,//--> 	EASY
	"2": 100,//--> 	MEDIUM
	"3": 90//-->	HARD
};

const DEBUG = false;

//----> Cores	http://htmlcolorcodes.com/color-chart/flat-design-color-chart/
//----> Sons	https://freesound.org/people/Kastenfrosch/packs/10069/
//----> Fundo playing https://www.youtube.com/watch?v=QdIYVXCfrQM (loop em 3:30)
//----> Fundo main https://www.youtube.com/watch?v=jdqcB_lKS1A