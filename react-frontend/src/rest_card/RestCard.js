import './RestCard.css'
import background from './img/rest.jpeg';
import $ from 'jquery';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';


function RestCard(){
    return (
        <div className = "card img-fluid">
            <img className="card-img-top" src={background} alt="Blue Background"></img>
            <div className="card-img-overlay">
                <form>
                    <div className ="form-group">
                        <div className="row justify-content-md-center">
                            <div className="col-md-10">
                                <div className="input-group input-group-lg">
                                    <input type="text" id="nomeRest" className="form-control transparent"  placeholder="Nome"></input>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-md-center">
                            <div className="col-md-10">
                                <div className="input-group input-group-lg">
                                    <input type="E-mail" id="emailRest" className="form-control transparent"  placeholder="E-mail"></input>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-md-center">
                            <div className="col-md-10">
                                <div className="input-group input-group-lg">
                                    <input type="password" id="passRest" className="form-control transparent"  placeholder="Senha"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="row justify-content-md-center">
                    <div className="col-md-9">
                        <button type="button" className="btn btn-light btn-block btn-lg btn-rest" onClick={getDataRest}>REST</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

function getDataRest(){

    let nome = $("#nomeRest").val();
    let email =  $("#emailRest").val();
    let pass = $("#passRest").val();
    
    if (!nome.trim() || !email.trim() || !pass.trim()) {
        alert("Todos os campos são obrigatórios");
        return;
    }
    if(!isEmailValid(email)) return;
    if(!isPassValid(pass)) return ;

    
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
            $("#nomeRest").val("");
            $("#emailRest").val("");
            $("#passRest").val("");
		}
	});
}

function isPassValid(pass){
    if(pass.length < 8) {
        alert("Senha deve ter no mínimo 8 caractéres!");
        return false;
    }
    else return true;
}

function isEmailValid(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(email).toLowerCase())){
        alert("Não me parece um e-mail válido");
        return false;
    }else return true;
}
export default RestCard;
