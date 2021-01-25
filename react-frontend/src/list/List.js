import './List.css'
import $ from 'jquery';

function List(){
    getAllUsers();
      
    return (
       <div className="jumbotron">
            <h1 className="display-4">Usuários no Banco de Dados</h1>
            <p className="lead">Mostrando ID, Nome e E-mail separados por -</p>
            <hr className="my-4"></hr>
            <div className="card" >
                <ul className="list-group list-group-flush" id="users">
                </ul>
            </div>
       </div>
    );
}

function getAllUsers(){
    let urlGetall = `http://localhost:8000/users`;
    $.ajax({
        url: urlGetall,
        type: 'GET',
        success: function (result) {
            $.each(result, function (indice, usr) {
                $("#users").append(`<li class="list-group-item">${usr.id} - ${usr.name} - ${usr.email}</li>`);
            });
        },
        error: function () {
            alert('Houve um erro.');
        }
    })
}

export default List;