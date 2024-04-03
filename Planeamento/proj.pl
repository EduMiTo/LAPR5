%cidadeArmazem(<codigo>).
cidade_armazem('M02').

% ================================================================ US 3.2.3 1-a =====================================================================================
% racioc�nio - para listar todos os trajetos poss�veis, a partir de uma lista de encomendas, tratamos a lista de encomendas. juntando numa lista os locais de entrega. (armazens_rota)
% tendo a lista de locais de entregas, guardamos todos os trajetos poss�veis, utilizando o predicado permutacao, numa lista, sendo que cada trajeto come�a e acaba em Matosinhos.

apaga1(X,[X|L],L).
apaga1(X,[Y|L],[Y|L1]):-apaga1(X,L,L1).

permutacao([],['Matosinhos']).
permutacao(L,[X|L1]):- apaga1(X,L,Li),permutacao(Li,L1).


permutacao2([],['M02']).
permutacao2(L,[X|L1]):- apaga1(X,L,Li),permutacao2(Li,L1).


gerarTrajetorias(L,['Matosinhos'|L1]) :- permutacao(L,L1).

armazens_rota(Lista) :-findall(Local, (entrega(_,_,_,Id,_,_), idArmazem(Local, Id)), Lista).


trajetos(Lista):- armazens_rota(L), findall(T, gerarTrajetorias(L,T), Lista).

% ================================================================ US 3.2.3 1-b =====================================================================================

soma_pesos([],[],0).
soma_pesos([A1|Lista],[PesoT|LP],PesoT):-
    soma_pesos(Lista,LP,Peso1), entrega(_,_,Peso,A1,_,_), PesoT is Peso+Peso1.

acrescenta_tara(Tara,[],[Tara]).
acrescenta_tara(Tara,[Peso|LP],[PesoTara|LPT]):-
    acrescenta_tara(Tara,LP,LPT),
    PesoTara is Peso+Tara.

calcula_tempo(LA,TempoE):-
    soma_pesos(LA,LP,_),
    carateristicasCam(_,Tara,_,Bat,_,_),
    acrescenta_tara(Tara,LP,LPT),
    cidade_armazem(Ar),
    append([Ar|LA],[Ar],LAcompleto),
    tempo(LAcompleto,LPT,Bat,TempoE).

tempo([Armazem1,Armazem2], [PesoComTara], BateriaCam, TempoTotal):-
    carateristicasCam(Camiao,Tara,Capacidade,MaxBateria,_,_),
    dadosCam_t_e_ta(Camiao, Armazem1, Armazem2,_, TempoViagem,_, TempoAdicional),!,
    TempoComCarga is TempoViagem*(PesoComTara/(Tara+Capacidade)),
    Bateria is BateriaCam,
    ((Bateria<0.2*MaxBateria,
    TempoTotal is TempoComCarga+TempoAdicional);
    (TempoTotal is TempoComCarga)).

tempo([Armazem1, Armazem2, Armazem3|ListaArmazens], [PesoComTara,PesoComTara2|ListaPesos], BateriaCam, TempoTotal):-
    carateristicasCam(Camiao,Tara,Capacidade,MaxBateria,_,TempoRecarga20a80),
    dadosCam_t_e_ta(Camiao, Armazem1, Armazem2,_, TempoViagem, Energia, TempoAdicional),
    dadosCam_t_e_ta(Camiao,Armazem2, Armazem3,_,_, Energia2,_),!,
    TempoComCarga is TempoViagem*(PesoComTara/(Tara+Capacidade)),
    EnergiaDaViagem is Energia*(PesoComTara/(Tara+Capacidade)),
    ((BateriaCam =\= (0.2*MaxBateria)),
    Bateria is BateriaCam - EnergiaDaViagem),
    EnergiaDaViagem2 is Energia2*(PesoComTara2/(Tara+Capacidade)),
    ((((Bateria - EnergiaDaViagem2)<(0.2*MaxBateria)),
    (((cidade_armazem(Armazem3)),TempoCarregamento is ((EnergiaDaViagem2 + (0.2*MaxBateria)-Bateria)*TempoRecarga20a80)/(0.6*MaxBateria),BateriaSeguinte is (EnergiaDaViagem2 + (0.2*MaxBateria)-Bateria));
    (TempoCarregamento is (((0.8*MaxBateria)-Bateria)*TempoRecarga20a80)/(0.6*MaxBateria),
    BateriaSeguinte is (0.8*MaxBateria)));
    (TempoCarregamento is 0,BateriaSeguinte is Bateria))),
    entrega(_,_,_,Armazem2,_,TempoRetira),
    (((TempoCarregamento > TempoRetira),
    TempoAConsiderar is TempoCarregamento);
    TempoAConsiderar is TempoRetira),
    BatAComparar is 0.8*MaxBateria,
    ((BateriaSeguinte == BatAComparar,BateriaSeguinte-EnergiaDaViagem2<(0.2*MaxBateria),
    TempoAAdicionar is TempoAdicional, BateriaSeguinte is (0.2 * MaxBateria));
    (TempoAAdicionar is 0)),
    tempo([Armazem2,Armazem3|ListaArmazens], [PesoComTara2|ListaPesos], BateriaSeguinte, TempoAoMomento),
    TempoTotal is TempoAoMomento+TempoComCarga+TempoAConsiderar+TempoAAdicionar.

tempo(_,_,_,100000):-!.

seq_tempo_min(LA, Tempo):-trajetos(Lista),
    run(Lista),
    tempo_min(LAsM,Tempo),
    append(['M02'|LAsM], ['M02'], LA).
    %tempoParaHMS(Tempo, Horas, Minutos, Segundos).
    %write('O trajeto'),write(LA),write(' e o trajeto que permite ao camiao voltar mais cedo, com um tempo de '),write(Horas),write(' hora(s), '),write(Minutos),write(' minuto(s) e '),write(Segundos),write(' segundo(s).'),nl.

run([]):-retractall(tempo_min(_,_)),
    assertz(tempo_min(_,100000)).

run([Traj|Lista]):-
    run(Lista),
    trajetoPorIdSemMat(Traj,TrajId),
    calcula_tempo(TrajId,Tempo),
    atualiza(TrajId,Tempo).

atualiza(LEPerm,Tempo):-
    tempo_min(_,TempoMin),
    ((Tempo<TempoMin,!,retract(tempo_min(_,_)), assertz(tempo_min(LEPerm,Tempo));true)).
      %write('Tempo='),write(Tempo), write(' '),write(LEPerm),nl)
   %;true).

trajetoPorIdSemMat([_|Lista], Trajs):- trajetoPorId(Lista,Trajs).

trajetoPorId([_],[]).
trajetoPorId([A|Lista],LF):-
    trajetoPorId(Lista, Lid),
    idArmazem(A,Id),
    append(Lid,[Id],LF).

tempoParaHMS(Tempo, Horas, Minutos, Segundos):-
    ((div(round(Tempo),60)<0,Horas is 0, Minutos is truncate(Tempo), Segundos is ((Tempo - Minutos)*60));(
    Horas is div(round(Tempo),60),
    Minutos is truncate(Tempo - (Horas*60)),
    Segundos is round(((Tempo - (Horas*60) - Minutos)*60)))).

% ================================================================ US 3.2.3 1-e =====================================================================================

majMin(Majorante,Minorante):-
    carateristicasCam(_,_,_,CargaTotal,_,TCarr),
    listaEntregas(L),
    soma_pesos(L,_,PesoTotal),
    cidade_armazem(Ar),

    calculaMaj(Ar,L,PesoTotal,TempoMaj,Energia),
    EnergiaA is CargaTotal-(0.2*CargaTotal),
    TempoEnergia is ((Energia-EnergiaA)*60)/TCarr,
    Majorante is TempoMaj + TempoEnergia,
    calculaMin(Ar,L,PesoTotal,Minorante).

listaEntregas(L):-
    findall(Id, entrega(_,_,_,Id,_,_), L).

calculaMaj(ArmazemAtual,[],PesoTotal,Majorante,EnergiaTotal):-
    carateristicasCam(_,Tara,Capacidade,_,_,_),
    cidade_armazem(Ultimo),
    maiorTempoArmazem(ArmazemAtual,[Ultimo],_,Tempo,PesoTotal,Tara,Capacidade,Energia),
    EnergiaTotal is Energia,
    Majorante is Tempo.
calculaMaj(ArmazemAtual,ListaArmazens,PesoTotal,Majorante,EnergiaTotal):-
    carateristicasCam(_,Tara,Capacidade,_,_,_),
    maiorTempoArmazem(ArmazemAtual,ListaArmazens,ProxArmazem,Tempo,PesoTotal,Tara,Capacidade,Energia),
    entrega(_,_,Massa,ProxArmazem,_,TempoDescarregar),
    ProxPeso is PesoTotal - Massa,
    apagarArmazem(ProxArmazem,ListaArmazens,ListaNova),
    calculaMaj(ProxArmazem,ListaNova,ProxPeso,TempoMaj,E),
    EnergiaTotal is Energia + E,
    Majorante is TempoMaj + Tempo + TempoDescarregar.

maiorTempoArmazem(_,[],_,0,_,_,_,0).
maiorTempoArmazem(ArmazemPartida,[A|ListaArmazens],ProximoArmazem,Tempo,PesoTotal,Tara,Capacidade,Energia):-
    dadosCam_t_e_ta(_,ArmazemPartida,A,_,TempoViagem,EnergiaViagem,TempoAdicional),
    TempoComCarga is TempoViagem*((Tara+PesoTotal)/(Tara+Capacidade)),
    EnergiaComCarga is EnergiaViagem*((Tara+PesoTotal)/(Tara+Capacidade)),
    TempoTotal is TempoComCarga + TempoAdicional,
    maiorTempoArmazem(ArmazemPartida,ListaArmazens,ProxA,T,PesoTotal,Tara,Capacidade,E),
    (((TempoTotal > T),Tempo is TempoTotal,Energia is EnergiaComCarga,ProximoArmazem = A);(Tempo is T,Energia is E,ProximoArmazem = ProxA)).

apagarArmazem(_,[],[]).
apagarArmazem(A,[A|L],LN):- apagarArmazem(A,L,LN).
apagarArmazem(A,[B|L],[B|LN]):- apagarArmazem(A,L,LN).





calculaMin(ArmazemAtual,[],PesoTotal,Minorante):-
    carateristicasCam(_,Tara,Capacidade,_,_,_),
    cidade_armazem(Ultimo),
    menorTempoArmazem(ArmazemAtual,[Ultimo],_,Tempo,PesoTotal,Tara,Capacidade),
    Minorante is Tempo.
calculaMin(ArmazemAtual,ListaArmazens,PesoTotal,Minorante):-
    carateristicasCam(_,Tara,Capacidade,_,_,_),
    menorTempoArmazem(ArmazemAtual,ListaArmazens,ProxArmazem,Tempo,PesoTotal,Tara,Capacidade),
    entrega(_,_,Massa,ProxArmazem,_,TempoDescarregar),
    ProxPeso is PesoTotal - Massa,
    apagarArmazem(ProxArmazem,ListaArmazens,ListaNova),
    calculaMin(ProxArmazem,ListaNova,ProxPeso,TempoMin),
    Minorante is TempoMin + Tempo + TempoDescarregar.

menorTempoArmazem(_,[],_,10000,_,_,_).
menorTempoArmazem(ArmazemPartida,[A|ListaArmazens],ProximoArmazem,Tempo,PesoTotal,Tara,Capacidade):-
    dadosCam_t_e_ta(_,ArmazemPartida,A,_,TempoViagem,_,_),
    TempoTotal is TempoViagem*((Tara+PesoTotal)/(Tara+Capacidade)),
    menorTempoArmazem(ArmazemPartida,ListaArmazens,ProxA,T,PesoTotal,Tara,Capacidade),
    (((TempoTotal < T),Tempo is TempoTotal,ProximoArmazem = A);(Tempo is T,ProximoArmazem = ProxA)).


% ================================================================ US 3.2.3 1-d =====================================================================================

%TIME

bfs_tempo(['M02'|Caminho], T):-armazens_rota(L),bfs2_tempo('Matosinhos',L,Caminho,T),!.


bfs2_tempo(Origem,[],['M02'],T):-idArmazem(Origem,ID),dadosCam_t_e_ta(_,ID,'M02',_,T,_,_).
bfs2_tempo(Origem,[H|T],[ID|Caminho], Tempo):-calcular_armazem_mais_proximo(Origem,[H|T],Temp,N),delete([H|T],N,NovaLista),bfs2_tempo(N,NovaLista,Caminho,Tempo1),idArmazem(N,ID), Tempo is Tempo1 + Temp .


calcular_armazem_mais_proximo(_,[],5000,_):-!.
calcular_armazem_mais_proximo(Origem,[H|T],R,Node):-calcular_armazem_mais_proximo(Origem, T, R1, Node1),
idArmazem(Origem,OrigemID),idArmazem(H,DestinoID),dadosCam_t_e_ta(_,OrigemID,DestinoID,_,Tempo,_,_),((Tempo<R1,!, R is Tempo, Node = H);R is R1, Node = Node1).



%MASS

bfsMassa(['M02'|ListaFinal],T):- armazens_rota(L), bfsMassa2(L, Li), permutacao2(Li, ListaFinal), calc_temp_mass(['M02'|ListaFinal], T),!.

bfsMassa2([],[]).
bfsMassa2(L,[MPID|ListaFinal]):- descobrirMaisPesado(L,_, MPID),idArmazem(NomeArmazem, MPID), delete(L, NomeArmazem, Li), bfsMassa2(Li, ListaFinal).


descobrirMaisPesado([],0,0).
descobrirMaisPesado([X|L], MP, MPID):-descobrirMaisPesado(L,MP1, MPID1), idArmazem(X, ID), entrega(_,_,Massa,ID,_,_),((Massa>MP1,!,MP is Massa, MPID = ID);MP is MP1, MPID = MPID1).

%RATIO MASS/TIME

bfs_relacao_massa_tempo(['M02'|Caminho], T):-armazens_rota(L),bfs2_relacao_massa_tempo('Matosinhos',L,Caminho, T),!.


bfs2_relacao_massa_tempo(Origem,[],['M02'],T):-idArmazem(Origem,ID),dadosCam_t_e_ta(_,ID,'M02',_,T,_,_).
bfs2_relacao_massa_tempo(Origem,[H|T], [ID|Caminho], Temp):-calcular_relacao_armazem(Origem,[H|T],Tempo,_,N),delete([H|T],N,NovaLista),bfs2_relacao_massa_tempo(N,NovaLista,Caminho, Temp1),idArmazem(N,ID), Temp is Temp1 + Tempo.


calcular_relacao_armazem(_,[],1,0,_):-!.
calcular_relacao_armazem(Origem,[H|T],R,M,Node):-calcular_relacao_armazem(Origem,T,R1,M1,Node1),
idArmazem(Origem,OrigemID),idArmazem(H,DestinoID),dadosCam_t_e_ta(_,OrigemID,DestinoID,_,Tempo,_,_),entrega(_,_,Massa,DestinoID,_,_),((Massa/Tempo>M1/R1,!, R is Tempo,M is Massa, Node = H);R is R1, M is M1, Node = Node1).




calc_temp_mass([_], 0).
calc_temp_mass([Origem, Destino |T], Temp):- calc_temp_mass([Destino|T], Temp1), dadosCam_t_e_ta(_,Origem,Destino,_,Tempo,_,_), Temp is Temp1 + Tempo.






calcular_tempo_execucao(L,T, TSol):-
    get_time(Ti),
    seq_tempo_min(L,T),
    get_time(Tf),
    TSol is Tf-Ti,
    !.

calcular_tempo_execucao_1(L,T,TSol):-
    get_time(Ti),
    bfs_tempo(L,T),
    get_time(Tf),
    TSol is Tf-Ti,
    !.
calcular_tempo_execucao_2(L,T,TSol):-
    get_time(Ti),
    bfsMassa(L,T),
    get_time(Tf),
    TSol is Tf-Ti,
    !.

calcular_tempo_execucao_3(L,T,TSol):-
    get_time(Ti),
    bfs_relacao_massa_tempo(L,T),
    get_time(Tf),
    TSol is Tf-Ti,
    !.






%verificarAlgoritmo(L):-
%consult('KnowledgeBase.pl'),
%findall(entrega(_,_,_,_,_,_),entrega(_,_,_,_,_,_),L1),
%length(L1,N),
%write('Numero de entregas: '),write(N),nl,
%(N>8,!, bfs_relacao_massa_tempo(L));seq_tempo_min(L).
%
%planeamento_plate_data(Plate, Data,L):-
%getTruck(Plate),
%getPaths(Plate),
%getWarehouses(),
%getDeliveries(Plate,Data),
%verificarAlgoritmo(L),!.
