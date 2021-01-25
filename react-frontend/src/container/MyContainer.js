import './MyContainer.css'

import RestCard from '../rest_card/RestCard';
import GraphQLCard from '../graphql_card/GraphQLCard';
function MyContainer(){
    return (
        <div className="my-wrapper">
            <div className= "row justify-content-md-center ">
                <div className="col-12 col-sm-12 col-md-4">
                    <RestCard />
                </div>
                <div className="col-12 col-sm-12 col-md-2 img">
                    
                </div>
                <div className="col-12 col-sm-12 col-md-4">
                    <GraphQLCard />
                </div>
            </div>
            </div>
    );
}
export default MyContainer;
