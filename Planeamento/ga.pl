:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic camioes/1.

%carateristicasCam(matricula,tara,carga,bateria,autonomia,TempoCarregamento80) - carga estava a 2000 antes

%carateristicasCam('25-10-AD',3000,4300,120,100,90).
%carateristicasCam('16-10-AD',7500,4300,80,100,60).
%carateristicasCam('01-10-BC',7500,4300,80,100,60).
%carateristicasCam('11-10-AD',7500,4300,80,100,60).
%carateristicasCam('77-77-AB',7500,4300,80,100,90).
%
%
%
%
%
%dadosCam_t_e_ta('25-10-AD','V04','V03',33,67,25,0).
%dadosCam_t_e_ta('25-10-AD','V04','V02',26,53,18,0).
%dadosCam_t_e_ta('25-10-AD','V04','V01',45,90,38,0).
%dadosCam_t_e_ta('25-10-AD','V04','T01',41,82,23,0).
%dadosCam_t_e_ta('25-10-AD','V04','S03',40,80,30,0).
%dadosCam_t_e_ta('25-10-AD','V04','S02',34,69,29,0).
%dadosCam_t_e_ta('25-10-AD','V04','S01',27,55,24,0).
%dadosCam_t_e_ta('25-10-AD','V04','P03',34,69,29,0).
%dadosCam_t_e_ta('25-10-AD','V04','P02',14,29,6,0).
%dadosCam_t_e_ta('25-10-AD','V04','P01',37,74,30,0).
%dadosCam_t_e_ta('25-10-AD','V04','O01',41,82,38,0).
%dadosCam_t_e_ta('25-10-AD','V04','M02',17,34,10,0).
%dadosCam_t_e_ta('25-10-AD','V04','M01',21,42,13,0).
%dadosCam_t_e_ta('25-10-AD','V04','G01',20,40,11,0).
%dadosCam_t_e_ta('25-10-AD','V04','E01',21,42,14,0).
%dadosCam_t_e_ta('25-10-AD','V04','A01',64,128,46,0).
%dadosCam_t_e_ta('25-10-AD','V03','V04',32,65,24,0).
%dadosCam_t_e_ta('25-10-AD','V03','V02',34,69,29,0).
%dadosCam_t_e_ta('25-10-AD','V03','V01',70,141,61,37).
%dadosCam_t_e_ta('25-10-AD','V03','T01',30,61,15,0).
%dadosCam_t_e_ta('25-10-AD','V03','S03',65,130,52,25).
%dadosCam_t_e_ta('25-10-AD','V03','S02',28,57,28,0).
%dadosCam_t_e_ta('25-10-AD','V03','S01',52,105,46,0).
%dadosCam_t_e_ta('25-10-AD','V03','P03',7,15,3,0).
%dadosCam_t_e_ta('25-10-AD','V03','P02',33,67,23,0).
%dadosCam_t_e_ta('25-10-AD','V03','P01',46,92,42,0).
%dadosCam_t_e_ta('25-10-AD','V03','O01',66,132,60,35).
%dadosCam_t_e_ta('25-10-AD','V03','M02',23,46,18,0).
%dadosCam_t_e_ta('25-10-AD','V03','M01',28,57,16,0).
%dadosCam_t_e_ta('25-10-AD','V03','G01',42,84,31,0).
%dadosCam_t_e_ta('25-10-AD','V03','E01',46,92,37,0).
%dadosCam_t_e_ta('25-10-AD','V03','A01',89,179,68,45).
%dadosCam_t_e_ta('25-10-AD','V02','V04',26,53,17,0).
%dadosCam_t_e_ta('25-10-AD','V02','V03',34,69,29,0).
%dadosCam_t_e_ta('25-10-AD','V02','V01',47,95,45,0).
%dadosCam_t_e_ta('25-10-AD','V02','T01',34,69,18,0).
%dadosCam_t_e_ta('25-10-AD','V02','S03',40,80,38,0).
%dadosCam_t_e_ta('25-10-AD','V02','S02',26,53,25,0).
%dadosCam_t_e_ta('25-10-AD','V02','S01',41,82,36,0).
%dadosCam_t_e_ta('25-10-AD','V02','P03',35,71,35,0).
%dadosCam_t_e_ta('25-10-AD','V02','P02',21,42,13,0).
%dadosCam_t_e_ta('25-10-AD','V02','P01',17,34,16,0).
%dadosCam_t_e_ta('25-10-AD','V02','O01',43,86,44,0).
%dadosCam_t_e_ta('25-10-AD','V02','M02',18,36,14,0).
%dadosCam_t_e_ta('25-10-AD','V02','M01',18,36,12,0).
%dadosCam_t_e_ta('25-10-AD','V02','G01',17,34,8,0).
%dadosCam_t_e_ta('25-10-AD','V02','E01',37,74,30,0).
%dadosCam_t_e_ta('25-10-AD','V02','A01',66,132,51,24).
%dadosCam_t_e_ta('25-10-AD','V01','V04',43,86,38,0).
%dadosCam_t_e_ta('25-10-AD','V01','V03',69,139,61,37).
%dadosCam_t_e_ta('25-10-AD','V01','V02',45,90,44,0).
%dadosCam_t_e_ta('25-10-AD','V01','T01',66,132,58,35).
%dadosCam_t_e_ta('25-10-AD','V01','S03',21,42,10,0).
%dadosCam_t_e_ta('25-10-AD','V01','S02',61,122,57,31).
%dadosCam_t_e_ta('25-10-AD','V01','S01',30,61,17,0).
%dadosCam_t_e_ta('25-10-AD','V01','P03',71,143,66,45).
%dadosCam_t_e_ta('25-10-AD','V01','P02',44,99,38,0).
%dadosCam_t_e_ta('25-10-AD','V01','P01',48,97,48,0).
%dadosCam_t_e_ta('25-10-AD','V01','O01',13,27,9,0).
%dadosCam_t_e_ta('25-10-AD','V01','M02',52,105,45,0).
%dadosCam_t_e_ta('25-10-AD','V01','M01',54,109,46,0).
%dadosCam_t_e_ta('25-10-AD','V01','G01',40,80,38,0).
%dadosCam_t_e_ta('25-10-AD','V01','E01',40,80,35,0).
%dadosCam_t_e_ta('25-10-AD','V01','A01',29,59,18,0).
%dadosCam_t_e_ta('25-10-AD','T01','V04',39,78,22,0).
%dadosCam_t_e_ta('25-10-AD','T01','V03',29,59,15,0).
%dadosCam_t_e_ta('25-10-AD','T01','V02',33,67,17,0).
%dadosCam_t_e_ta('25-10-AD','T01','V01',68,77,58,33).
%dadosCam_t_e_ta('25-10-AD','T01','S03',61,62,52,25).
%dadosCam_t_e_ta('25-10-AD','T01','S02',13,27,7,0).
%dadosCam_t_e_ta('25-10-AD','T01','S01',52,105,47,0).
%dadosCam_t_e_ta('25-10-AD','T01','P03',33,67,20,0).
%dadosCam_t_e_ta('25-10-AD','T01','P02',38,76,20,0).
%dadosCam_t_e_ta('25-10-AD','T01','P01',40,80,30,0).
%dadosCam_t_e_ta('25-10-AD','T01','O01',64,128,57,31).
%dadosCam_t_e_ta('25-10-AD','T01','M02',33,67,20,0).
%dadosCam_t_e_ta('25-10-AD','T01','M01',23,46,11,0).
%dadosCam_t_e_ta('25-10-AD','T01','G01',37,74,29,0).
%dadosCam_t_e_ta('25-10-AD','T01','E01',53,107,35,0).
%dadosCam_t_e_ta('25-10-AD','T01','A01',77,174,65,42).
%dadosCam_t_e_ta('25-10-AD','S03','V04',37,74,32,0).
%dadosCam_t_e_ta('25-10-AD','S03','V03',63,126,54,28).
%dadosCam_t_e_ta('25-10-AD','S03','V02',39,78,38,0).
%dadosCam_t_e_ta('25-10-AD','S03','V01',20,40,10,0).
%dadosCam_t_e_ta('25-10-AD','S03','T01',60,120,53,26).
%dadosCam_t_e_ta('25-10-AD','S03','S02',54,109,50,23).
%dadosCam_t_e_ta('25-10-AD','S03','S01',16,32,6,0).
%dadosCam_t_e_ta('25-10-AD','S03','P03',64,128,61,37).
%dadosCam_t_e_ta('25-10-AD','S03','P02',43,86,33,0).
%dadosCam_t_e_ta('25-10-AD','S03','P01',41,82,42,0).
%dadosCam_t_e_ta('25-10-AD','S03','O01',9,19,8,0).
%dadosCam_t_e_ta('25-10-AD','S03','M02',46,92,38,0).
%dadosCam_t_e_ta('25-10-AD','S03','M01',47,97,41,0).
%dadosCam_t_e_ta('25-10-AD','S03','G01',33,67,32,0).
%dadosCam_t_e_ta('25-10-AD','S03','E01',30,61,19,0).
%dadosCam_t_e_ta('25-10-AD','S03','A01',38,76,23,0).
%dadosCam_t_e_ta('25-10-AD','S02','V04',33,67,27,0).
%dadosCam_t_e_ta('25-10-AD','S02','V03',29,59,27,0).
%dadosCam_t_e_ta('25-10-AD','S02','V02',26,53,25,0).
%dadosCam_t_e_ta('25-10-AD','S02','V01',63,126,58,33).
%dadosCam_t_e_ta('25-10-AD','S02','T01',12,25,7,0).
%dadosCam_t_e_ta('25-10-AD','S02','S03',55,111,52,25).
%dadosCam_t_e_ta('25-10-AD','S02','S01',48,97,46,0).
%dadosCam_t_e_ta('25-10-AD','S02','P03',31,63,28,0).
%dadosCam_t_e_ta('25-10-AD','S02','P02',29,59,23,0).
%dadosCam_t_e_ta('25-10-AD','S02','P01',37,74,23,0).
%dadosCam_t_e_ta('25-10-AD','S02','O01',59,118,57,31).
%dadosCam_t_e_ta('25-10-AD','S02','M02',27,55,25,0).
%dadosCam_t_e_ta('25-10-AD','S02','M01',21,42,18,0).
%dadosCam_t_e_ta('25-10-AD','S02','G01',32,65,28,0).
%dadosCam_t_e_ta('25-10-AD','S02','E01',44,88,41,0).
%dadosCam_t_e_ta('25-10-AD','S02','A01',82,164,65,42).
%dadosCam_t_e_ta('25-10-AD','S01','V04',26,53,23,0).
%dadosCam_t_e_ta('25-10-AD','S01','V03',52,105,46,0).
%dadosCam_t_e_ta('25-10-AD','S01','V02',37,74,34,0).
%dadosCam_t_e_ta('25-10-AD','S01','V01',31,63,17,0).
%dadosCam_t_e_ta('25-10-AD','S01','T01',49,99,46,0).
%dadosCam_t_e_ta('25-10-AD','S01','S03',16,32,6,0).
%dadosCam_t_e_ta('25-10-AD','S01','S02',46,92,52,0).
%dadosCam_t_e_ta('25-10-AD','S01','P03',54,109,52,25).
%dadosCam_t_e_ta('25-10-AD','S01','P02',32,65,24,0).
%dadosCam_t_e_ta('25-10-AD','S01','P01',41,82,42,0).
%dadosCam_t_e_ta('25-10-AD','S01','O01',20,40,14,0).
%dadosCam_t_e_ta('25-10-AD','S01','M02',35,71,30,0).
%dadosCam_t_e_ta('25-10-AD','S01','M01',39,78,33,0).
%dadosCam_t_e_ta('25-10-AD','S01','G01',29,59,27,0).
%dadosCam_t_e_ta('25-10-AD','S01','E01',17,34,14,0).
%dadosCam_t_e_ta('25-10-AD','S01','A01',48,97,30,0).
%dadosCam_t_e_ta('25-10-AD','P03','V04',33,67,28,0).
%dadosCam_t_e_ta('25-10-AD','P03','V03',7,15,3,0).
%dadosCam_t_e_ta('25-10-AD','P03','V02',35,71,34,0).
%dadosCam_t_e_ta('25-10-AD','P03','V01',71,143,66,45).
%dadosCam_t_e_ta('25-10-AD','P03','T01',33,67,19,0).
%dadosCam_t_e_ta('25-10-AD','P03','S03',66,132,57,31).
%dadosCam_t_e_ta('25-10-AD','P03','S02',30,61,29,0).
%dadosCam_t_e_ta('25-10-AD','P03','S01',54,109,51,24).
%dadosCam_t_e_ta('25-10-AD','P03','P02',34,69,28,0).
%dadosCam_t_e_ta('25-10-AD','P03','P01',47,95,65,0).
%dadosCam_t_e_ta('25-10-AD','P03','O01',67,134,65,42).
%dadosCam_t_e_ta('25-10-AD','P03','M02',24,48,23,0).
%dadosCam_t_e_ta('25-10-AD','P03','M01',27,55,24,0).
%dadosCam_t_e_ta('25-10-AD','P03','G01',43,86,35,0).
%dadosCam_t_e_ta('25-10-AD','P03','E01',47,95,41,0).
%dadosCam_t_e_ta('25-10-AD','P03','A01',90,181,72,50).
%dadosCam_t_e_ta('25-10-AD','P02','V04',16,32,6,0).
%dadosCam_t_e_ta('25-10-AD','P02','V03',32,65,23,0).
%dadosCam_t_e_ta('25-10-AD','P02','V02',18,36,12,0).
%dadosCam_t_e_ta('25-10-AD','P02','V01',30,97,40,0).
%dadosCam_t_e_ta('25-10-AD','P02','T01',30,61,24,0).
%dadosCam_t_e_ta('25-10-AD','P02','S03',41,82,34,0).
%dadosCam_t_e_ta('25-10-AD','P02','S02',26,53,22,0).
%dadosCam_t_e_ta('25-10-AD','P02','S01',32,65,26,0).
%dadosCam_t_e_ta('25-10-AD','P02','P03',34,69,30,0).
%dadosCam_t_e_ta('25-10-AD','P02','P01',28,57,26,0).
%dadosCam_t_e_ta('25-10-AD','P02','O01',44,88,38,0).
%dadosCam_t_e_ta('25-10-AD','P02','M02',16,32,7,0).
%dadosCam_t_e_ta('25-10-AD','P02','M01',17,34,10,0).
%dadosCam_t_e_ta('25-10-AD','P02','G01',16,32,6,0).
%dadosCam_t_e_ta('25-10-AD','P02','E01',29,59,18,0).
%dadosCam_t_e_ta('25-10-AD','P02','A01',67,134,46,0).
%dadosCam_t_e_ta('25-10-AD','P01','V04',34,69,30,0).
%dadosCam_t_e_ta('25-10-AD','P01','V03',42,84,42,0).
%dadosCam_t_e_ta('25-10-AD','P01','V02',14,29,16,0).
%dadosCam_t_e_ta('25-10-AD','P01','V01',38,97,49,21).
%dadosCam_t_e_ta('25-10-AD','P01','T01',38,76,31,0).
%dadosCam_t_e_ta('25-10-AD','P01','S03',41,82,42,0).
%dadosCam_t_e_ta('25-10-AD','P01','S02',37,74,22,0).
%dadosCam_t_e_ta('25-10-AD','P01','S01',42,84,44,0).
%dadosCam_t_e_ta('25-10-AD','P01','P03',44,88,48,0).
%dadosCam_t_e_ta('25-10-AD','P01','P02',29,59,26,0).
%dadosCam_t_e_ta('25-10-AD','P01','O01',44,88,48,0).
%dadosCam_t_e_ta('25-10-AD','P01','M02',26,53,28,0).
%dadosCam_t_e_ta('25-10-AD','P01','M01',26,53,26,0).
%dadosCam_t_e_ta('25-10-AD','P01','G01',30,61,22,0).
%dadosCam_t_e_ta('25-10-AD','P01','E01',35,71,38,0).
%dadosCam_t_e_ta('25-10-AD','P01','A01',58,116,36,0).
%dadosCam_t_e_ta('25-10-AD','O01','V04',40,80,38,0).
%dadosCam_t_e_ta('25-10-AD','O01','V03',66,132,60,35).
%dadosCam_t_e_ta('25-10-AD','O01','V02',42,84,44,0).
%dadosCam_t_e_ta('25-10-AD','O01','V01',12,25,9,0).
%dadosCam_t_e_ta('25-10-AD','O01','T01',63,126,58,33).
%dadosCam_t_e_ta('25-10-AD','O01','S03',11,23,9,0).
%dadosCam_t_e_ta('25-10-AD','O01','S02',21,116,56,30).
%dadosCam_t_e_ta('25-10-AD','O01','S01',21,42,14,0).
%dadosCam_t_e_ta('25-10-AD','O01','P03',67,134,66,45).
%dadosCam_t_e_ta('25-10-AD','O01','P02',46,92,38,0).
%dadosCam_t_e_ta('25-10-AD','O01','P01',44,88,48,0).
%dadosCam_t_e_ta('25-10-AD','O01','M02',49,99,44,0).
%dadosCam_t_e_ta('25-10-AD','O01','M01',51,103,46,0).
%dadosCam_t_e_ta('25-10-AD','O01','G01',37,74,38,0).
%dadosCam_t_e_ta('25-10-AD','O01','E01',35,71,27,0).
%dadosCam_t_e_ta('25-10-AD','O01','A01',34,69,23,0).
%dadosCam_t_e_ta('25-10-AD','M02','V04',13,27,7,0).
%dadosCam_t_e_ta('25-10-AD','M02','V03',23,46,18,0).
%dadosCam_t_e_ta('25-10-AD','M02','V02',17,34,14,0).
%dadosCam_t_e_ta('25-10-AD','M02','V01',52,105,45,0).
%dadosCam_t_e_ta('25-10-AD','M02','T01',26,63,20,0).
%dadosCam_t_e_ta('25-10-AD','M02','S03',47,95,36,0).
%dadosCam_t_e_ta('25-10-AD','M02','S02',26,53,26,0).
%dadosCam_t_e_ta('25-10-AD','M02','S01',34,69,30,0).
%dadosCam_t_e_ta('25-10-AD','M02','P03',24,48,24,0).
%dadosCam_t_e_ta('25-10-AD','M02','P02',14,29,7,0).
%dadosCam_t_e_ta('25-10-AD','M02','P01',22,55,28,0).
%dadosCam_t_e_ta('25-10-AD','M02','O01',48,97,44,0).
%dadosCam_t_e_ta('25-10-AD','M02','M01',12,25,9,0).
%dadosCam_t_e_ta('25-10-AD','M02','G01',24,48,14,0).
%dadosCam_t_e_ta('25-10-AD','M02','E01',27,55,20,0).
%dadosCam_t_e_ta('25-10-AD','M02','A01',70,141,51,24).
%dadosCam_t_e_ta('25-10-AD','M01','V04',19,38,11,0).
%dadosCam_t_e_ta('25-10-AD','M01','V03',26,53,14,0).
%dadosCam_t_e_ta('25-10-AD','M01','V02',16,32,13,0).
%dadosCam_t_e_ta('25-10-AD','M01','V01',55,111,48,0).
%dadosCam_t_e_ta('25-10-AD','M01','T01',22,44,11,0).
%dadosCam_t_e_ta('25-10-AD','M01','S03',48,97,42,0).
%dadosCam_t_e_ta('25-10-AD','M01','S02',21,42,19,0).
%dadosCam_t_e_ta('25-10-AD','M01','S01',39,78,34,0).
%dadosCam_t_e_ta('25-10-AD','M01','P03',25,50,26,0).
%dadosCam_t_e_ta('25-10-AD','M01','P02',18,36,10,0).
%dadosCam_t_e_ta('25-10-AD','M01','P01',22,55,27,0).
%dadosCam_t_e_ta('25-10-AD','M01','O01',51,103,47,0).
%dadosCam_t_e_ta('25-10-AD','M01','M02',13,27,10,0).
%dadosCam_t_e_ta('25-10-AD','M01','G01',23,46,16,0).
%dadosCam_t_e_ta('25-10-AD','M01','E01',32,65,24,0).
%dadosCam_t_e_ta('25-10-AD','M01','A01',74,149,54,25).
%dadosCam_t_e_ta('25-10-AD','G01','V04',18,36,10,0).
%dadosCam_t_e_ta('25-10-AD','G01','V03',40,80,30,0).
%dadosCam_t_e_ta('25-10-AD','G01','V02',17,34,8,0).
%dadosCam_t_e_ta('25-10-AD','G01','V01',33,82,38,0).
%dadosCam_t_e_ta('25-10-AD','G01','T01',33,67,29,0).
%dadosCam_t_e_ta('25-10-AD','G01','S03',33,67,32,0).
%dadosCam_t_e_ta('25-10-AD','G01','S02',30,61,27,0).
%dadosCam_t_e_ta('25-10-AD','G01','S01',29,59,28,0).
%dadosCam_t_e_ta('25-10-AD','G01','P03',44,84,36,0).
%dadosCam_t_e_ta('25-10-AD','G01','P02',19,38,8,0).
%dadosCam_t_e_ta('25-10-AD','G01','P01',31,63,23,0).
%dadosCam_t_e_ta('25-10-AD','G01','O01',37,74,37,0).
%dadosCam_t_e_ta('25-10-AD','G01','M02',23,46,14,0).
%dadosCam_t_e_ta('25-10-AD','G01','M01',23,46,15,0).
%dadosCam_t_e_ta('25-10-AD','G01','E01',25,50,22,0).
%dadosCam_t_e_ta('25-10-AD','G01','A01',60,120,45,0).
%dadosCam_t_e_ta('25-10-AD','E01','V04',23,46,14,0).
%dadosCam_t_e_ta('25-10-AD','E01','V03',34,99,38,0).
%dadosCam_t_e_ta('25-10-AD','E01','V02',34,69,30,0).
%dadosCam_t_e_ta('25-10-AD','E01','V01',39,78,34,0).
%dadosCam_t_e_ta('25-10-AD','E01','T01',42,95,42,0).
%dadosCam_t_e_ta('25-10-AD','E01','S03',30,121,19,0).
%dadosCam_t_e_ta('25-10-AD','E01','S02',44,88,41,0).
%dadosCam_t_e_ta('25-10-AD','E01','S01',18,36,14,0).
%dadosCam_t_e_ta('25-10-AD','E01','P03',51,103,44,0).
%dadosCam_t_e_ta('25-10-AD','E01','P02',30,61,18,0).
%dadosCam_t_e_ta('25-10-AD','E01','P01',37,74,38,0).
%dadosCam_t_e_ta('25-10-AD','E01','O01',34,69,27,0).
%dadosCam_t_e_ta('25-10-AD','E01','M02',32,65,22,0).
%dadosCam_t_e_ta('25-10-AD','E01','M01',37,74,25,0).
%dadosCam_t_e_ta('25-10-AD','E01','G01',27,55,22,0).
%dadosCam_t_e_ta('25-10-AD','E01','A01',58,116,42,0).
%dadosCam_t_e_ta('25-10-AD','A01','V04',64,128,45,0).
%dadosCam_t_e_ta('25-10-AD','A01','V03',90,181,68,45).
%dadosCam_t_e_ta('25-10-AD','A01','V02',66,132,51,24).
%dadosCam_t_e_ta('25-10-AD','A01','V01',29,59,18,0).
%dadosCam_t_e_ta('25-10-AD','A01','T01',87,174,66,45).
%dadosCam_t_e_ta('25-10-AD','A01','S03',38,76,23,0).
%dadosCam_t_e_ta('25-10-AD','A01','S02',32,64,64,40).
%dadosCam_t_e_ta('25-10-AD','A01','S01',48,97,30,0).
%dadosCam_t_e_ta('25-10-AD','A01','P03',92,184,74,53).
%dadosCam_t_e_ta('25-10-AD','A01','P02',70,141,46,0).
%dadosCam_t_e_ta('25-10-AD','A01','P01',58,116,35,0).
%dadosCam_t_e_ta('25-10-AD','A01','O01',37,74,24,0).
%dadosCam_t_e_ta('25-10-AD','A01','M02',73,147,52,25).
%dadosCam_t_e_ta('25-10-AD','A01','M01',75,151,54,25).
%dadosCam_t_e_ta('25-10-AD','A01','G01',61,122,46,0).
%dadosCam_t_e_ta('25-10-AD','A01','E01',61,122,42,0).
%idArmazem('Vila Nova de Gaia','V04').
%idArmazem('Vila do Conde','V03').
%idArmazem('Valongo','V02').
%idArmazem('Vale de Cambra','V01').
%idArmazem('Trofa','T01').
%idArmazem('São João da Madeira','S03').
%idArmazem('Santo Tirso','S02').
%idArmazem('Santa Maria da Feira','S01').
%idArmazem('Póvoa de Varzim','P03').
%idArmazem('Porto','P02').
%idArmazem('Paredes','P01').
%idArmazem('Oliveira de Azeméis','O01').
%idArmazem('Matosinhos','M02').
%idArmazem('Maia','M01').
%idArmazem('Gondomar','G01').
%idArmazem('Espinho','E01').
%idArmazem('Arouca','A01').
%
%entrega('413230/2','10/10/2022',106,'M01',190,70).
%entrega('726559/4','10/10/2022',106,'P01',190,70).
%entrega('464528/7','10/10/2022',107,'S01',190,70).
%entrega('464528/7','10/10/2022',107,'S02',190,70).
%entrega('464528/7','10/10/2022',107,'V01',190,70).
%entrega('464528/7','10/10/2022',107,'G01',190,70).



%entrega('464528/7','10/01/2023',200,'A01',8,10).
%entrega('464528/7','10/01/2023',750,'P03',25,30).
%entrega('464528/7','10/01/2023',1600,'G01',53,62).
%entrega('464528/7','10/01/2023',120,'P02',6,8).
%entrega('464528/7','10/01/2023',300,'S02',15,20).
%entrega('464528/7','10/01/2023',310,'V04',16,20).
%entrega('464528/7','10/01/2023',1700,'V01',55,65).
%entrega('464528/7','10/01/2023',900,'S03',30,35).
%entrega('464528/7','10/01/2023',440,'O01',18,24).
%entrega('464528/7','10/01/2023',1400,'T01',47,58).
%entrega('464528/7','10/01/2023',380,'E01',20,25).
%entrega('464528/7','10/01/2023',560,'P01',28,38).
%entrega('464528/7','10/01/2023',260,'V02',13,18).
%entrega('464528/7','10/01/2023',350,'S01',18,22).
%entrega('464528/7','10/01/2023',260,'M01',14,17).
%entrega('464528/7','10/01/2023',850,'V03',27,31).

%entrega('464528/7', '10/10/2022', 200, 'A01', 8, 10).
%entrega('464528/7', '10/10/2022', 1500, 'P03', 50, 60).
%entrega('464528/7', '10/10/2022', 1600, 'G01', 53, 62).
%entrega('464528/7', '10/10/2022', 120, 'P02', 6, 8).
%entrega('464528/7', '10/10/2022', 300, 'S02', 15, 20).
%entrega('464528/7', '10/10/2022', 310, 'V04', 16, 20).
%entrega('464528/7', '10/10/2022', 1700, 'V01', 55, 65).
%entrega('464528/7', '10/10/2022', 1800, 'S03', 60, 70).
%entrega('464528/7', '10/10/2022', 440, 'O01', 18, 24).
%entrega('464528/7', '10/10/2022', 1400, 'T01', 47, 58).
%entrega('464528/7', '10/10/2022', 380, 'E01', 20, 25).
%entrega('464528/7', '10/10/2022', 560, 'P01', 28, 38).
%entrega('464528/7', '10/10/2022', 260, 'V02', 13, 18).
%entrega('464528/7', '10/10/2022', 350, 'S01', 18, 22).
%entrega('464528/7', '10/10/2022', 260, 'M01', 14, 17).
%entrega('464528/7', '10/10/2022', 1300, 'V03', 45, 55).

% entregas(NEntregas).
%entregas(16).
%
%cidade_armazem('M02').

% tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao).
%tarefa(t1,2,5,1).
%tarefa(t2,4,7,6).
%tarefa(t3,1,11,2).
%tarefa(t4,3,9,3).
%tarefa(t5,3,8,2).

% tarefas(NTarefas).
%tarefas(5).

% parameterizacao
inicializa(Nger,Dpop,P1,P2):- (retract(geracoes(_));true), asserta(geracoes(Nger)),
	num_camioes(N), (retract(camioes(_));true), asserta(camioes(N)),
	(retract(populacao(_));true), asserta(populacao(Dpop)),
	PC is P1/100,
	(retract(prob_cruzamento(_));true),	asserta(prob_cruzamento(PC)),
	PM is P2/100,
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).

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



separar_lista_avaliacao([Lista*Av|_], Lista,Av):-!. 

separar_lista_mais_que_um_camiao([Lista*_|_], ListaFinal, AvaliacaoFinal):- camioes(Num_camioes), entregas(Num_entregas), EntregasCamiao is Num_entregas/Num_camioes, floor(EntregasCamiao, EntregasCamiaoFloor), separar_lista_mais_que_um_camiao_2(Lista, ListaFinal, Avaliacao,EntregasCamiaoFloor, Num_camioes), format_avaliacao(Avaliacao, AvaliacaoFinal).

separar_lista_mais_que_um_camiao_2([],[],[],_,_).
separar_lista_mais_que_um_camiao_2(Lista,[Lista|ListaF], [Avaliacao|Av],EntregasCamiaoFloor,1):-avalia_individuo(Lista,Avaliacao), separar_lista_mais_que_um_camiao_2([], ListaF, Av,EntregasCamiaoFloor,_).

separar_lista_mais_que_um_camiao_2(Lista, [ListaFinal|ListaF], [Avaliacao|Av], EntregasCamiaoFloor, Num_camioes):-Num_camioes1 is Num_camioes - 1, criarSubLista(Lista, EntregasCamiaoFloor, ListaFinal), subtract(Lista, ListaFinal, ListaAEnviar), avalia_individuo(ListaFinal,Avaliacao), separar_lista_mais_que_um_camiao_2(ListaAEnviar, ListaF, Av,EntregasCamiaoFloor,Num_camioes1).

criarSubLista([],_,[]).
criarSubLista(_,0,[]).
criarSubLista([H|T], Contador, [H|Lista]):- Contador1 is Contador - 1, criarSubLista(T,Contador1, Lista).

format_avaliacao([],[]).
format_avaliacao([_*AV|T], [AV|Avaliacao]):- format_avaliacao(T, Avaliacao).

gera(NGer,DPop,P1,P2, ListaFinal,Av):-
	inicializa(NGer,DPop,P1,P2),
	get_time(TempoInicial),
	gera_populacao(Pop),
	camioes(NCamioes),
	(NCamioes is 1, (avalia_populacao(Pop,PopAv));
	avalia_populacao_mquc(Pop,PopAvBeta),verificar_carga(PopAvBeta, PopAv)),
	%write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao(0,NG,PopOrd,TempoInicial, Lista),
	(NCamioes is 1, separar_lista_avaliacao(Lista, ListaFinal,Av);
	separar_lista_mais_que_um_camiao(Lista, ListaFinal, Av)),!.

gera_populacao(Pop):-
	populacao(TamPop),
	entregas(NumT),
	findall(Local,entrega(_,_,_,Local,_,_),ListaArmazens),
	%append(['M02'|ListaArmazens],['M02'],LN),
	bfsMassa(EI2,_),
	bfs_tempo(EI1,_),
	tirar_cabeca(EI2,E2),
	tirar_cabeca(EI1, E1),
	%random_permutation(ListaArmazens,LAP),
	%E2 = LAP,
	%E1 = E2,
	(((E1 == E2),troca_2_ele(E1,Enovo));troca_lista(E1,Enovo)),
	%write('Individuo gerado pela heuristica do tempo= '),write(Enovo),nl,
	%write('Individuo gerado pela heuristica da massa= '),write(E2),nl,
	gera_populacao(TamPop-2,ListaArmazens,NumT,PopGerada),
	append([Enovo,E2],PopGerada,Pop),!.

troca_2_ele([X,Y|L1],[Y,X|L1]).

%Tirar a cabeça (M02) e depois inverter a lista para tirar o ultimo elemento (M02).
tirar_cabeca([_|T],LF):-reverse(T, NL), tirar_fim(NL, LInvertida), reverse(LInvertida, LF),!.

tirar_fim([_|T], T):-!.

troca_lista([],[]).
troca_lista([H|T], [H|NL]):- troca_lista(T, NL).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaArmazens,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaArmazens,NumT,Resto),
	gera_individuo(ListaArmazens,NumT,Ind),
	not(member(Ind,Resto)).
gera_populacao(TamPop,ListaArmazens,NumT,L):-
	gera_populacao(TamPop,ListaArmazens,NumT,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaArmazens,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaArmazens,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	calcula_tempo(Ind,V),
	avalia_populacao(Resto,Resto1).


avalia_populacao_mquc([],[]).
avalia_populacao_mquc([Lista|Resto],[Lista*Soma|Resto1]):-
	camioes(Num_camioes), entregas(Num_entregas), EntregasCamiao is Num_entregas/Num_camioes, floor(EntregasCamiao, EntregasCamiaoFloor),
	separar_lista_mais_que_um_camiao_2(Lista, _, Avaliacao,EntregasCamiaoFloor, Num_camioes), format_avaliacao(Avaliacao, AvaliacaoFinal),
	somarAv(AvaliacaoFinal, Soma),
	avalia_populacao_mquc(Resto,Resto1).

somarAv([],0).
somarAv([H|T],Soma):-
	somarAv(T,Soma1),
	Soma is Soma1 + H.


ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd),!.

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


gera_geracao(G,G,Pop,_,Pop):-!.
	%write('Geracao '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao(_,_,Pop,TempoInicial,Pop):-
	get_time(TempoAtual),
	TempoConsumido is TempoAtual-TempoInicial,
	TempoConsumido > 5,
	%write('Tempo esgotado: '), write(TempoConsumido),nl,
	!.

gera_geracao(N,G,Pop,TempoInicial,ListaRetorno):-
	%write('Geracao '), write(N), write(':'), nl, write(Pop), nl,
	populacao(DP),
	random_permutation(Pop,RandPop),
	cruzamento(RandPop,CruzPop),
	mutacao(CruzPop,MutPop),
	camioes(NCamioes),
	


	

	(NCamioes is 1,avalia_populacao(MutPop,NovaPopAv), (ordena_populacao(NovaPopAv,NovaPopAvOrd), union(Pop,NovaPopAvOrd,PopTotal));
	avalia_populacao_mquc(MutPop,NovaPopAv),ordena_populacao(NovaPopAv,NovaPopOrd), verificar_carga(NovaPopOrd,PopCargaFinal), ordena_populacao(PopCargaFinal,PopCargaFinalOrd),union(Pop,PopCargaFinalOrd,PopTotal)),

	ordena_populacao(PopTotal,PopTotalOrd),

	P1 is round(0.20*DP),
	((P1 < 1, P is P1+1); P is P1),
	select_first_n(PopTotalOrd,P,Select),
	remove_elements(PopTotalOrd,P,Rest),


	valores_avaliacao(Rest, RestNovo),
	nao_elitista(DP,RestNovo,P,MPopTotal),

	lista_com_produto_avaliacao(MPopTotal, MPopTotalOriginal),

	avalia_populacao(MPopTotalOriginal, MPopTotalAv),

	append(Select,MPopTotalAv,MPopTotalAp),

	ordena_populacao(MPopTotalAp, PopMaisQueFinal),
	N1 is N+1,
	gera_geracao(N1,G,PopMaisQueFinal,TempoInicial,ListaRetorno).

nao_elitista(_,[],[],[]):-!.

nao_elitista(NIndividuos,RestNovo,P,MPopOrd):-
	IndividuosSG is NIndividuos - P,
	ordena_populacao(RestNovo,RestNovoOrd),
	select_first_n(RestNovoOrd,IndividuosSG,MPopOrd).



remove_elements([], 0, []):-!.

remove_elements([H|List], 0, [H|Result]):-
	remove_elements(List, 0, Result),!.

remove_elements([_|List], N, Result):-
	N1 is N - 1,
	remove_elements(List,N1,Result).

select_first_n(_,0,[]):-!.

select_first_n([H|List], N, [H|Result]):-
    N1 is N - 1,
	select_first_n(List,N1,Result).


valores_avaliacao([],[]):-!.

valores_avaliacao([X*VX|L1],[X*NVX|L2]):-
	random(0.0,1.0,N),
	NVX is VX * N,
	valores_avaliacao(L1,L2).


lista_com_produto_avaliacao([],[]):-!.

lista_com_produto_avaliacao([X*_|L1],[X|L2]):-
	lista_com_produto_avaliacao(L1,L2).


preencher_lista(Tlista,PopSorte,PopSorte,_):-
	populacao(P),
	Tlista==P,!.
preencher_lista(_,MPopTotal,PopMaSorte,PopFinal):-
	append(MPopTotal,PopMaSorte,PopFinal).

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	entregas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	entregas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	entregas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	entregas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).



% somar a carga total das entregas
soma_carga(Soma):-findall(Carga, entrega(_,_,Carga,_,_,_), Lista), soma_lista(Lista, Soma).

soma_lista([],0).
soma_lista([H|T],Soma):-soma_lista(T,Soma1), Soma is Soma1 + H.

% numero de camioes a ser usado
% 4300 kg é a carga default na documentação
num_camioes(N):-soma_carga(Soma), N1 is Soma/4300, floor(N1, Inteira), Decimal is N1-Inteira, ((Decimal > 0.8, N is Inteira+2); (Decimal > 0, N is Inteira+1)).


% verificar se a carga atribuida a um camiao excede a sua Capacidade
verificar_carga(Lista, ListaApta):-camioes(Num_camioes), entregas(Num_entregas), EntregasCamiao is Num_entregas/Num_camioes, floor(EntregasCamiao, Inteira), carga_por_camiao(Lista, Inteira,_,Num_camioes,_,ListaApta),!.

carga_por_camiao([],_,_,_,_,[]):-!.
carga_por_camiao([H|T],Inteira,Soma,Num_camioes,Baralhar,ListaApta):-carga_por_camiao2(H,Inteira,_, _,Num_camioes,Baralhar, Flag), (Flag is 1,!, removerAv(H,ListaSemAv), random_permutation(ListaSemAv,ListaPermutada), avalia_individuo(ListaPermutada, ListaPermutadaAv), carga_por_camiao([ListaPermutadaAv|T], Inteira, Soma,Num_camioes,_,ListaApta)).
carga_por_camiao([H|T],Inteira,Soma,Num_camioes,Baralhar,[H|ListaApta]):-(carga_por_camiao(T,Inteira,Soma,Num_camioes,Baralhar,ListaApta)).

carga_por_camiao2([]*_,_,0,[],_,_,_):-!.

carga_por_camiao2([H|T]*_,Inteira,Soma,Lista,Num_camioes, Baralhar, Flag):- Baralhar \== 1,!, carga_por_camiao3([H|T],Inteira,Soma, Lista,Num_camioes),
((Soma > 4300,!, Baralhar1 is 1); Baralhar1 is 0), Numero_camioes is Num_camioes - 1, subtract([H|T], Lista, Lista2),
carga_por_camiao2(Lista2*_, Inteira, _,_,Numero_camioes,Baralhar1,Flag1), ((Flag1 \== 1,!, Flag is Baralhar1);(Flag is Flag1)).

carga_por_camiao2(_,_,_,_,_,1,_):-!.

carga_por_camiao3([],_,0,[],1):-!.
carga_por_camiao3(_, 0, 0, [],_):-!.
carga_por_camiao3([H|T],Inteira,Soma,[H|Lista],Num_camioes):-((Num_camioes is 1,!, ParteInteira is Inteira + 1); (ParteInteira is Inteira)), Inteira1 is ParteInteira - 1, carga_por_camiao3(T,Inteira1,Soma1,Lista,Num_camioes), entrega(_,_,Carga,H,_,_), Soma is Carga+Soma1.

removerAv(Lista*_,Lista):-!.


avalia_individuo(Lista, Lista*V):-calcula_tempo(Lista,V),!.




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

armazens_rota(Lista) :-findall(Local, (entrega(_,_,_,Id,_,_), idArmazem(Local, Id)), Lista).

permutacao2([],['M02']).
permutacao2(L,[X|L1]):- apaga1(X,L,Li),permutacao2(Li,L1).

calc_temp_mass([_], 0).
calc_temp_mass([Origem, Destino |T], Temp):- calc_temp_mass([Destino|T], Temp1), dadosCam_t_e_ta(_,Origem,Destino,_,Tempo,_,_), Temp is Temp1 + Tempo.

apaga1(X,[X|L],L).
apaga1(X,[Y|L],[Y|L1]):-apaga1(X,L,L1).