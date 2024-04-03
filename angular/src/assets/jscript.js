function myFunction(tipo) {
    var input, filter, table, tr, i, txtValue, isDisplayed = false;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    const td = [];
    for (i = 0; i < tr.length; i++) {
        isDisplayed = false;
        if (tipo == 'truck')
            td[0] = tr[i].getElementsByTagName("td")[0];
        else if (tipo == 'deliveries'){
            td[0] = tr[i].getElementsByTagName("td")[0];
            td[1] = tr[i].getElementsByTagName("td")[3];
            td[2] = tr[i].getElementsByTagName("td")[5];
        }
        else if (tipo == 'warehouses' || tipo == 'packings' || tipo == 'paths'){
            td[0] = tr[i].getElementsByTagName("td")[0];
            td[1] = tr[i].getElementsByTagName("td")[1];
        }
        if (td) {
            for (j = 0; j < td.length; j++){
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    isDisplayed = true;
                }
            }
            
            if (isDisplayed){
                tr[i].style.display = "";
            }
            else{
                tr[i].style.display = "none";
            }
        }       
    }
}
