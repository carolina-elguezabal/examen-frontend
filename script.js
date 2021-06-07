var token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ';
var button = '<a onclick="verDetalles(event)" href="#miModal" class="verDetalles">Ver detalles</a>';
var nuevadata = [];

function verDetalles(e){ 
    document.getElementById('nameField').innerHTML = e.target.parentElement.parentElement.childNodes[0].outerText;
    document.getElementById('priceField').innerHTML = e.target.parentElement.parentElement.childNodes[1].outerText;
    document.getElementById('quantityField').innerHTML = e.target.parentElement.parentElement.childNodes[2].outerText;
    document.getElementById('skuField').innerHTML = e.target.parentElement.parentElement.childNodes[3].outerText;
};

function modalAgregar(){
    nuevadata.push({
        name: "Samsung A5",
        price: "15000.00",
        quantity: "2",
        sku: "PRUEBA",
        button: button 
    });
    console.log(nuevadata);
    datatable.destroy();
    datatable = $('#table_id').DataTable({
        data : nuevadata,
        columns: [
            { data: 'name' },
            { data: 'price' },
            { data: 'quantity' },
            { data: 'sku' },
            { data: 'button' }
        ]
    });
}

$(document).ready( function () {
    $.ajax({
            type : "GET",
            contentType: 'application/json',
            url : `https://eshop-deve.herokuapp.com/api/v2/orders`,
            headers: {'Authorization': `Bearer ${token}`},
            success : function(result) { 
            for (let i = 0; i < result.orders.length; i++) {
                nuevadata.push({
                    number: result.orders[i].number,
                    name: result.orders[i].items[0].name,
                    price: `$${result.orders[i].items[0].price}`,
                    quantity: result.orders[i].items[0].quantity,
                    sku: result.orders[i].items[0].sku,
                    button: button
                });
            }
            datatable = $('#table_id').DataTable({
                data : nuevadata,
                columns: [
                    { data: 'name' },
                    { data: 'price' },
                    { data: 'quantity' },
                    { data: 'sku' },
                    { data: 'button' }
                ]
            });
            },
            error : function(result) { 
                alert('¡Error!');
                $('#table_id').DataTable({   
                });
            }         
    })
});