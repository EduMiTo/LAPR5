:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_server)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_client)).

%:- ensure_loaded('KnowledgeBase.pl').

%:- ensure_loaded('proj.pl').



:- http_handler('/api/Planning', plan, []).

:-dynamic (paths/7).
:-dynamic (trucks/6).
:-dynamic (warehouses/2).
:-dynamic (deliveries/6).
:- json_object dto(id:string, email:string).
:- json_object joyDistressDto(joy:float, distress:float).

:- initialization
    http_server(http_dispatch,[port(4201)]).

	getTruck(P) :-
    %http_parameters(Request,[ plate(Plate, [])]),
    (destroy_trucks();true),
    %atom_concat('/api/Trucks/',Plate, Method),
	atom_concat('http://localhost:3000', '/api/Trucks/', Url),
	http_open(Url, ResultJSON, []),
	json_read_dict(ResultJSON, ResultObj),
	getTrucksInfo(ResultObj, [P,T,MC,MB,A,CT|L]),
	createDynamicTrucks([P,T,MC,MB,A,CT|L]),
	open('KnowledgeBase.pl',write,Writer),
	T1 is CT.hours*60 + CT.minutes + CT.seconds/60,
	string_concat('',"carateristicasCam('",Dados),
	string_concat(Dados,P,Dados1),
	string_concat(Dados1,"',",Dados2),
	string_concat(Dados2,T,Dados3),
	string_concat(Dados3,',',Dados4),
	string_concat(Dados4,MC,Dados5),
	string_concat(Dados5,',',Dados6),
	string_concat(Dados6,MB,Dados7),
	string_concat(Dados7,',',Dados8),
	string_concat(Dados8,A,Dados9),
	string_concat(Dados9,',',Dados10),
	string_concat(Dados10,T1,Dados11),
	string_concat(Dados11,').',Dados12),
	write(Writer,Dados12),
	nl(Writer),
	close(Writer),
	writeTrucksToFile(L,'KnowledgeBase.pl',6),
	close(ResultJSON).

getWarehouses():-
    (destroy_warehouses();true),
	atom_concat('http://localhost:5001', '/api/Warehouses/listAll', Url),
	http_open(Url, ResultJSON, []),
	json_read_dict(ResultJSON, ResultObj),
	getWarehousesInfo(ResultObj, ResultValue),
	createDynamicWarehouses(ResultValue),
    length(ResultValue,Tam),
	writeWarehousesToFile(ResultValue,'KnowledgeBase.pl',0,Tam),
	close(ResultJSON).

getDeliveries(Date):-
    (destroy_Deliveries();true),

	atom_concat('http://localhost:5001', '/api/Deliveries/listAll', Url),
	http_open(Url, ResultJSON, []),
	json_read_dict(ResultJSON, ResultObj),
	string_chars(Date,NDate),transforma_data(NDate,1, FDate),
	string_chars(DateAEnviar,FDate),

	getDeliveriesInfo(ResultObj, DateAEnviar, ResultValue),
	createDynamicDeliveries(ResultValue),
    length(ResultValue,Tam),
	NEnt is Tam/6,
	writeDeliveriesToFile(ResultValue,'KnowledgeBase.pl',0,Tam),
	close(ResultJSON),
	open('KnowledgeBase.pl',append,Writer),
	string_concat('',"entregas(",Dados),
	string_concat(Dados,NEnt,Dados1),
	string_concat(Dados1,").",Dados2),
	write(Writer,Dados2),
	nl(Writer),
	string_concat('',"cidade_armazem('M02').",Dados3),
	write(Writer,Dados3),
	close(Writer).


getPaths(Plate):-
	(destroy_paths();true),
	atom_concat('http://localhost:3000', '/api/Paths', Url),
	http_open(Url, ResultJSON, []),
	json_read_dict(ResultJSON, ResultObj),
	getPathsInfo(ResultObj, Plate, ResultValue),
	createDynamicPaths(ResultValue),
    length(ResultValue,Tam),
	writePathsToFile(ResultValue,'KnowledgeBase.pl',0,Tam),
	close(ResultJSON).


getPathsInfo([],_,[]).
getPathsInfo([H|T],Plate,[Plate,H.idWarehouseStart,H.idWarehouseEnd,H.distance,H.time,H.energy,H.extraTime|L]):-
	getPathsInfo(T,Plate, L).

getWarehousesInfo([],[]).
getWarehousesInfo([H|T],[H.id,H.designation|L]):-
	getWarehousesInfo(T, L).

%getDeliveriesInfo([],_,[]):-!.
%getDeliveriesInfo(_,[],[]):-!.
%getDeliveriesInfo([H|T],[H2|T2],[H, H2.limitDate, H2.weight, H2.loadTime, H2.unloadTime, H2.warehouse|L]):-(H == H2.id),!, getDeliveriesInfo(T, T2, L).
%getDeliveriesInfo([H|T],[H2|T2],L):-inserir_final(T2,H2,T3), getDeliveriesInfo([H|T], T3, L).


getDeliveriesInfo([],_,[]).
getDeliveriesInfo([H|T], Date, [H.id,Date,H.weight, H.loadTime, H.unloadTime, H.warehouse|L]):-(H.limitDate == Date),!,getDeliveriesInfo(T,Date,L).
getDeliveriesInfo([_|T], Date, L):-getDeliveriesInfo(T,Date,L).

transforma_data([],_,[]).
transforma_data([NDateH, NDateH2|NDateT],2,[NDateH,'/',NDateH2|FDate]):- transforma_data(NDateT,3,FDate).
transforma_data([NDateH, NDateH2|NDateT],3,[NDateH,'/',NDateH2|FDate]):- transforma_data(NDateT,4,FDate).
transforma_data([NDateH|NDateT],Cont,[NDateH|FDate]):- Cont1 is Cont + 1, transforma_data(NDateT,Cont1,FDate). 




inserir_final([], Y, [Y]).
inserir_final([I|R], Y, [I|R1]) :-
    inserir_final(R, Y, R1).


getTrucksInfo([],[]).
getTrucksInfo([H|T],[H.plate,H.tare,H.massCapacity,H.maximumBattery,H.autonomy,H.chargeTime|L]):-getTrucksInfo(T,L).

createDynamicPaths([]).
createDynamicPaths([P,IS,IE,D,T,E,EX|L]):-
	assert(paths(P,IS,IE,D,T,E,EX)),
	createDynamicPaths(L).

createDynamicWarehouses([]).
createDynamicWarehouses([I,D|L]):-
	assert(warehouses(I,D)),
	createDynamicWarehouses(L).

createDynamicDeliveries([]).
createDynamicDeliveries([I,W,D,U,Lo,WH|L]):-
	assert(deliveries(I,W,D,U,Lo,WH)),
	createDynamicDeliveries(L).

createDynamicTrucks([]).
createDynamicTrucks([P,T,MC,MB,A,CT|L]):-
	assert(trucks(P,T,MC,MB,A,CT)),
	createDynamicTrucks(L).

writePathsToFile([],_,_,_).
writePathsToFile([P,IS,IE,D,T,E,EX|L],Ficheiro,Modo,Tam):-
    T1 is T.hours*60 + T.minutes + T.seconds/60,
    EX1 is EX.hours*60 + EX.minutes + EX.seconds/60,
    open(Ficheiro,append,Writer),
	string_concat('',"dadosCam_t_e_ta('",Dados),
	string_concat(Dados,P,Dados1),
	string_concat(Dados1,"','",Dados2),
	string_concat(Dados2,IS,Dados3),
	string_concat(Dados3,"','",Dados4),
	string_concat(Dados4,IE,Dados5),
	string_concat(Dados5,"',",Dados6),
	string_concat(Dados6,D,Dados7),
	string_concat(Dados7,',',Dados8),
	string_concat(Dados8,T1,Dados9),
	string_concat(Dados9,',',Dados10),
	string_concat(Dados10,E,Dados11),
	string_concat(Dados11,',',Dados12),
	string_concat(Dados12,EX1,Dados13),
	string_concat(Dados13,').',Dados14),
	write(Writer,Dados14),
	nl(Writer),
    ModoNovo is Modo + 7,
	writePathsToFile(L,Ficheiro,ModoNovo,Tam),
	close(Writer).

writeWarehousesToFile([],_,_,_).
writeWarehousesToFile([I,D|L],Ficheiro,Modo,Tam):-
    open(Ficheiro,append,Writer),
	string_concat('',"idArmazem('",Dados),
	string_concat(Dados,D,Dados1),
	string_concat(Dados1,"','",Dados2),
	string_concat(Dados2,I,Dados3),
	string_concat(Dados3,"').",Dados4),
	write(Writer,Dados4),
	nl(Writer),
    ModoNovo is Modo + 2,
	writeWarehousesToFile(L,Ficheiro,ModoNovo,Tam),
	close(Writer).

writeDeliveriesToFile([],_,_,_).
writeDeliveriesToFile([I,W,D,U,Lo,WH|L],Ficheiro,Modo,Tam):-
	open(Ficheiro,append,Writer),
	string_concat('',"entrega('",Dados),
	string_concat(Dados,I,Dados1),
	string_concat(Dados1,"','",Dados2),
	string_concat(Dados2,W,Dados3),
	string_concat(Dados3,"',",Dados4),
	string_concat(Dados4,D,Dados5),
	string_concat(Dados5,",'",Dados6),
	string_concat(Dados6,WH,Dados7),
	string_concat(Dados7,"',",Dados8),
	string_concat(Dados8,Lo,Dados9),
	string_concat(Dados9,",",Dados10),
	string_concat(Dados10,U,Dados11),
	string_concat(Dados11,").",Dados12),
	write(Writer,Dados12),
	nl(Writer),
    ModoNovo is Modo + 6,
	writeDeliveriesToFile(L,Ficheiro,ModoNovo,Tam),
	close(Writer).

writeTrucksToFile([],_,_).
writeTrucksToFile([P,T,MC,MB,A,CT|L],Ficheiro,Modo):-
    T1 is CT.hours*60 + CT.minutes + CT.seconds/60,
    open(Ficheiro,append,Writer),
	string_concat('',"carateristicasCam('",Dados),
	string_concat(Dados,P,Dados1),
	string_concat(Dados1,"',",Dados2),
	string_concat(Dados2,T,Dados3),
	string_concat(Dados3,',',Dados4),
	string_concat(Dados4,MC,Dados5),
	string_concat(Dados5,',',Dados6),
	string_concat(Dados6,MB,Dados7),
	string_concat(Dados7,',',Dados8),
	string_concat(Dados8,A,Dados9),
	string_concat(Dados9,',',Dados10),
	string_concat(Dados10,T1,Dados11),
	string_concat(Dados11,').',Dados12),
	write(Writer,Dados12),
	nl(Writer),
	ModoNovo is Modo + 6,
	writeTrucksToFile(L,Ficheiro,ModoNovo),
	close(Writer).

destroy_paths():-
    retract(paths(_,_,_,_,_,_)),
    fail.

destroy_warehouses():-
    retract(warehouses(_,_)),
    fail.

destroy_Deliveries():-
    retract(deliveries(_,_,_,_,_,_)),
    fail.


destroy_trucks():-
    retract(trucks(_,_,_,_,_,_)),
    fail.

plan(Request):-
	cors_enable,
	format('Access-Control-Allow-Origin: ~w~n', [*]),
	format('Access-Control-Allow-Headers: ~w~n', [*]),
	http_parameters(Request,
	[plate(Plate, [string]),
	date(Date,[string]),
	type(Type,[string]),
	generations(Generations,[number]),
	crossover(Crossover,[number]),
	mutation(Mutation,[number]),
	population(Population,[number])
	]),

	
	%consult('proj.pl').
	planeamento_plate_data(Plate,Date, Type, Generations, Crossover, Mutation, Population, Tempo, L),
	Resp = json([truckPlate=Plate, planningDate=Date, path=L,time=Tempo, heuristic=Type, generations=Generations, crossover=Crossover, mutation=Mutation, population=Population]),
	reply_json(Resp).



verificarAlgoritmo(Plate, Date,L, Type, Generations, Crossover, Mutation, Population, Tempo, L):-
(((Type = "'BestPath'"),!,seq_tempo_min(L,Tempo)); ((Type = "'HeuristicTime'"),!,bfs_tempo(L,Tempo)); ((Type = "'HeuristicMass'"),!,bfsMassa(L,Tempo)); ((Type = "'HeuristicTimeMass'"),!,bfs_relacao_massa_tempo(L,Tempo));((Type="'GeneticAlgorithm'"),!,gera(Generations,Population , Mutation,Crossover , L, Tempo))),
((Type = "'GeneticAlgorithm'",!, ((is_list(Tempo),!,findall(Cam,carateristicasCam(Cam,_,_,_,_,_), ListaCamioes),atom_string(Atom, Plate), delete(ListaCamioes,Atom,  ListaCamioesFinal), postSolution([Plate|ListaCamioesFinal],Date,L,Tempo,Type)); (atomics_to_string(L, Caminho),postSolution(Plate,Date, Caminho, Tempo, Type))) );
atomics_to_string(L, Caminho),
postSolution(Plate,Date, Caminho, Tempo, Type)).


planeamento_plate_data(Plate, Date, Type, Generations, Crossover, Mutation, Population, Tempo, L):-
getTruck(PlateToUse),
getPaths(PlateToUse),
getWarehouses(),
getDeliveries(Date),
consult('KnowledgeBase.pl'),
consult('ga.pl'),
verificarAlgoritmo(Plate, Date,_, Type, Generations, Crossover, Mutation, Population, Tempo, L),!.


%falta adicionar o tempo
postSolution(_,_,[],_,_).

postSolution([HCamioes|TCamioes], Date, [H|T], [HTempo|TTempo], Type):-
	postSolution(TCamioes,Date,T,TTempo,Type),
	atomics_to_string(H, Caminho),
	Info = json([truckPlate=HCamioes, planningDate=Date, path=Caminho, planningTime=HTempo, heuristic=Type]),
	http_post('http://localhost:3000/api/Planning', json(Info), Reply, [json_object(dict)]),
	write('Plate:'), write(Reply.truckPlate), nl,
	write('Date:'), write(Reply.planningDate), nl,
	write('Solution:'), write(Reply.path), nl,
	write('Time:'), write(Reply.planningTime), nl.



postSolution(Plate, Date, Caminho, Tempo, Type):-
	Info = json([truckPlate=Plate, planningDate=Date, path=Caminho, planningTime=Tempo, heuristic=Type]),
	http_post('http://localhost:3000/api/Planning', json(Info), Reply, [json_object(dict)]),
	write('Plate:'), write(Reply.truckPlate), nl,
	write('Date:'), write(Reply.planningDate), nl,
	write('Solution:'), write(Reply.path), nl,
	write('Time:'), write(Reply.planningTime), nl.