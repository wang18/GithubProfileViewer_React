import React, { Component } from 'react';
import Repo from "./Repo";

class RepoList extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="">
                <ul className="list-group" >
                    {
                        this.props.userRepos.map(repo => {
                            return <Repo
                                repo={repo}
                                key={repo.id}
                                {...this.props}
                                />
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default RepoList;
