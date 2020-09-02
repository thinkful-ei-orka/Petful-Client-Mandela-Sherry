import React, { Component } from 'react';
import config from '../config';

import './AdoptionRoute.css';

class AdoptionRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientName: '',
            clientInLine: false,
            clientTurnToSelect: false,
            clientSelection:{},
            lineQueue:[],
            currentCat:{},
            currentDog: {},
            adopted: '',
            addingClients: false,
        }
    }
    
    componentDidMount() {
        //get all in line
        this.getLineQueue();
        this.setState({ addingCients: false })
    }

    handleNameSubmit = (e) => {
        e.preventDefault();
        this.setState({ 
            adopted: '',
            addingClients: false 
        })
        this.adoptionTimer = setInterval(this.adopt, 5000)
        let newClientName = this.state.clientName;
        //take name and send to api
        fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({personName: newClientName})
        })
        .then(res => {
            //get line state
            this.getLineQueue();
            //get first pets
            this.getNextCatDog();
        })
        .then(this.setState({clientInLine: true}))
        .catch(e => console.log('error:',e));
    };

    handleAdoptMeClick = (e) => {
        e.preventDefault();
        let adoptChoice = e.target.value
        if (adoptChoice === 'cat') {
            this.setState({clientSelection: this.state.currentCat})
        }
        else if (adoptChoice === 'dog') {
            this.setState({clientSelection: this.state.currentDog})
        }

        fetch(`${config.REACT_APP_API_ENDPOINT}/pets`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ petType: adoptChoice })
        })
        .catch(e => console.log('error:', e));

        fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
            method: 'DELETE'
            })
        .then(()=> this.setState({clientTurnToSelect: false}))
        .catch(e => console.log('error:', e));
    }

    getLineQueue = () => {
        fetch(`${config.REACT_APP_API_ENDPOINT}/people`)
        .then(res => res.json())
        .then(lineData => {
            return this.setState({
                lineQueue: lineData
            })
        })
        .then(() => {
            if (this.state.lineQueue[0] === this.state.clientName) {
            return this.setState({
                clientTurnToSelect: true
            }); 
            }
        })
        .catch(e => console.log('error:', e));
    }

    getNextCatDog = () => {
        fetch(`${config.REACT_APP_API_ENDPOINT}/pets`)
        .then(res => res.json())
        .then(petData => {
            this.setState({
                currentCat: petData[0],
                currentDog: petData[1]
            });
            }
        )
        .catch(e => console.log('error:',e));
    };

    getCurrentCatDog = () => {
        fetch(`${config.REACT_APP_API_ENDPOINT}/api/cat`)
        .then(res => res.json())
        .then(catData => {
            this.setState({
                currentCat: catData,
            });
            }
        )
        .catch(e => console.log('error:',e));

        fetch(`${config.REACT_APP_API_ENDPOINT}/api/dog`)
        .then(res => res.json())
        .then(dogData => {
            this.setState({
                currentDog: dogData,
            });
            }
        )
        .catch(e => console.log('error:',e));
    };

    adopt = () => {
        if (this.state.clientInLine) {
            let clientName = this.state.clientName
            let notInList = this.state.lineQueue.filter(name => name === clientName)
            if (notInList.length === 0) {
                clearInterval(this.adoptionTimer)
                return this.setState({
                    clientInLine: false,
                    clientTurnToSelect: false,
                })
            }
            if (!this.state.clientTurnToSelect) {
                let petChoice = Math.floor(Math.random() * 2);
                if (petChoice === 0) {
                    petChoice = 'cat'
                }
                else {
                    petChoice = 'dog'
                }
                fetch(`${config.REACT_APP_API_ENDPOINT}/pets`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ petType: petChoice })
                }).then(res => (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
                        method: 'DELETE'
                    })
                )
                .catch(e => console.log('error:', e));
            }
        }
        this.getLineQueue();
        this.getNextCatDog();
    };

    stopAdoptions = () => {
        clearInterval(this.adopt);
    }

    addClient = () => {
        let newClient = `TestClient${Math.floor(Math.random() * 88)}`
        fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({personName: newClient})
        })
        .then(res => {
            //get line state
            this.getLineQueue();
        })
        .catch(e => console.log('error:',e));
    }

    onAdoptClick = (adopted, petChoice) => {
        clearInterval(this.adoptionTimer)
        fetch(`${config.REACT_APP_API_ENDPOINT}/pets`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ petType: petChoice })
        }).then(() => {
            this.setState({
                clientName: '',
                clientTurnToSelect: false,
                clientInLine: false,
                adopted: adopted.name
            })
        }).then(() => {
            this.getLineQueue();
            this.getNextCatDog();
        })
        .catch(e => console.log('error:', e));
        
    }

    renderLine = () => {
        let lineElement = []
        this.state.lineQueue.map(element => {
            lineElement.push((<li key={element}>{element}</li>))
        });
        
        return lineElement
    }

    setName =(e) => {
        this.setState({
            clientName: e.target.value
        })
    };

    setAddingClients = () => {
        this.setState({ addingClients: !this.state.addingClients })
    }

    render() {
        if (this.state.lineQueue.length === 2 && this.state.addingClients === false) {
            this.setAddingClients();
            this.clientTimer = setInterval(this.addClient, 5000)
        }

        if (this.state.lineQueue.length >= 5 && (this.state.adopted.length > 0 || !this.state.clientInLine)) { 
            clearInterval(this.clientTimer)
        }
        
        return(
            <section className="adoption">
                <h1>Petful</h1>
                <form className='add-name-form' onSubmit={this.handleNameSubmit}>
                    <label htmlFor="client-name">Enter Your Name</label>    
                    <input type="text" onChange={this.setName} id="client-name" className="client-name-field" required></input>
                    <button type="submit" className="add-name-button small-btn">Jump In Line</button>
                </form>
                {this.state.lineQueue && 
                    <div className="client-line">
                        <ol>
                            {this.renderLine()}
                        </ol>
                    </div>
                }
                {this.state.adopted.length > 0 && <p className='adopted'>Congrats! You adopted {this.state.adopted}!</p>}
                {(this.state.clientInLine || this.state.adopted.length > 0) &&
                    <>
                    <div className="pet-selection">
                        <div className="cat-info container">
                            {this.state.clientTurnToSelect && <button className='adopt-button' type='button' onClick={() => this.onAdoptClick(this.state.currentCat, 'cat')}>Adopt {this.state.currentCat.name}!</button>}
                            <img className='animal-image' src={this.state.currentCat.imageURL} alt={this.state.currentCat.description}></ img>
                            <p className='pet-info'>My Name: {this.state.currentCat.name}</p>
                            <p className='pet-info'>Description: {this.state.currentCat.description}</p>
                            <p className='pet-info'>Breed: {this.state.currentCat.breed}</p>
                            <p className='pet-info'>Gender: {this.state.currentCat.gender}</p>
                            <p className='pet-info'>Age: {this.state.currentCat.age}</p>
                            <p className='pet-info'>My Story: {this.state.currentCat.story}</p>
                        </div>
                        <div className="dog-info container">
                            {this.state.clientTurnToSelect && <button className='adopt-button' type='button' onClick={() => this.onAdoptClick(this.state.currentDog, 'dog')}>Adopt {this.state.currentDog.name}!</button>}
                            <img className='animal-image' src={this.state.currentDog.imageURL} alt={this.state.currentDog.description}></ img>
                            <p className='pet-info'>My Name: {this.state.currentDog.name}</p>
                            <p className='pet-info'>Description: {this.state.currentDog.description}</p>
                            <p className='pet-info'>Breed: {this.state.currentDog.breed}</p>
                            <p className='pet-info'>Gender: {this.state.currentDog.gender}</p>
                            <p className='pet-info'>Age: {this.state.currentDog.age}</p>
                            <p className='pet-info'>My Story: {this.state.currentDog.story}</p>
                        </div>
                    </div>
                </>}
            </section>
        )
    }
}

export default AdoptionRoute;