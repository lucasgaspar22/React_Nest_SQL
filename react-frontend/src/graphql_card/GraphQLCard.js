import './GraphQLCard.css'
import background from './img/graphql.jpeg';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import $ from 'jquery';

function GraphQLCard(){
    return (
        <div className = "card img-fluid">
            <img className="card-img-top" src={background} alt="Blue Background"></img>
            <div className="card-img-overlay">
                <form>
                    <div className ="form-group">
                        <div className="row justify-content-md-center">
                            <div className="col-md-10">
                                <div className="input-group input-group-lg">
                                    <input type="text" id="nomeGQL" className="form-control transparent"  placeholder="Nome" required></input>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-md-center">
                            <div className="col-md-10">
                                <div className="input-group input-group-lg">
                                    <input type="E-mail" id="emailGQL" className="form-control transparent"  placeholder="E-mail" required></input>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row justify-content-md-center">
                        <div className="col-md-9">
                            <button type="button" className="btn btn-light btn-block btn-lg btn-grpahql" onClick={getDataQL}>GraphQL</button>
                        </div>
                    </div>

                </form>
                
            </div>
        </div>
    );
}

function getDataQL(){

    let nome = $("#nomeGQL").val();
    let email =  $("#emailGQL").val();
    let pass = Math.random().toString(36).substring(2,10);

    if (!nome.trim() || !email.trim()) {
        alert("Todos os campos são obrigatórios");
    }

    if(!isEmailValid(email)) return;

    let firtCrypt = sha256(pass + nome + email);
    let secCrypt = Base64.stringify(firtCrypt);

    
    let urlGetEmail = `http://localhost:8000/users/email/${email.trim()}`
    let urlPostNewUser= `http://localhost:8000/users/`;

    $.ajax({
        url: urlGetEmail,
        type: 'GET',
        success: function (result) {alert("Esse e-mail ja foi registrado!")},
        error: function () {
            $.ajax({
                url: urlPostNewUser,
                type:'POST',
                dataType:'json',
                data:{
                    name: nome,
                    email: email,
                    password: secCrypt
                },
                success: function(){
                    alert("Incluido com Sucesso!");
                },
                error: function(){
                    alert("Ocorreu um erro");
                }
            })
	    },
		complete: function () {
            $("#nomeGQL").val("");
            $("#emailGQL").val("");
		}
	});   
}

function isEmailValid(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(email).toLowerCase())){
        alert("Não me parece um e-mail válido");
        return false;
    }else return true;
}


export default GraphQLCard;
