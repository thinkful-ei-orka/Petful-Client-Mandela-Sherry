import React, { Component } from 'react'
import config from '../config'

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
        fetch(`${config.API_ENDPOINT}/people`, {
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

    getLineQueue = () => {
        console.log('getLineQ')
        fetch(`${config.API_ENDPOINT}/people`)
        .then(res => res.json())
        .then(lineData => {
            return this.setState({
                lineQueue: lineData
            })
        })
        .then(() => {
            console.log('lineQ', this.state.lineQueue)
            console.log('this.state.lineQueue[0]', this.state.lineQueue[0])
            if (this.state.lineQueue[0] === this.state.clientName) {
            console.log('time to sel')
            return this.setState({
                clientTurnToSelect: true
            }); 
            }
        })
        .catch(e => console.log('error:',e));
    }

    getNextCatDog = () => {
        fetch(`${config.API_ENDPOINT}/pets`)
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

    adopt = () => {
        console.log('adopting');
        if (this.state.clientInLine) {
            console.log('this.state.lineQueue[0] on line 82', this.state.lineQueue[0])
            let clientName = this.state.clientName
            let notInList = this.state.lineQueue.filter(name => name === clientName)
            console.log('notin list value', notInList)
            if (notInList.length === 0) {
                console.log('notInList')
                clearInterval(this.adoptionTimer)
                return this.setState({
                    clientInLine: false,
                    clientTurnToSelect: false,
                })
            }
            if (!this.state.clientTurnToSelect) {
                console.log('into the client not in line if line 105')
                let petChoice = Math.floor(Math.random() * 2);
                if (petChoice === 0) {
                    petChoice = 'cat'
                }
                else {
                    petChoice = 'dog'
                }
                console.log('deleting 1 pet:', petChoice);
                fetch(`${config.API_ENDPOINT}/pets`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ petType: petChoice })
                }).then(res => (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : fetch(`${config.API_ENDPOINT}/people`, {
                        method: 'DELETE'
                    })
                ).then(() => {
                    
                })
                .catch(e => console.log('error:', e));
            }
        }
        this.getLineQueue();
        this.getNextCatDog();
    };

    stopAdoptions = () => {
        console.log('time to stop the line')
        clearInterval(this.adopt);
    }

    addClient = () => {
        let newClient = `TestClient${Math.floor(Math.random() * 88)}`
        fetch(`${config.API_ENDPOINT}/people`, {
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
        console.log('adopted!', adopted)
        console.log('petChoice', petChoice)
        clearInterval(this.adoptionTimer)
        console.log('adopted in state', this.state.adopted)
        fetch(`${config.API_ENDPOINT}/pets`, {
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
        console.log('clientTurnToSelect', this.state.clientTurnToSelect)
        console.log('clientInLine', this.state.clientInLine)
        console.log('clinetName', this.state.clientName)
        console.log('line 198 lineQueue', this.state.lineQueue)

        if (this.state.lineQueue.length === 2 && this.state.addingClients === false) {
            console.log('into the if')
            this.setAddingClients();
            this.clientTimer = setInterval(this.addClient, 5000)
        }

        if (this.state.lineQueue.length >= 5 && (this.state.adopted.length > 0 || !this.state.clientInLine)) { 
            console.log('into that client adding time thingy')
            clearInterval(this.clientTimer)
        }
        console.log('addingClients', this.state.addingClients)
        console.log('opposite of above!', !this.state.addingClients)
        console.log('this.state.adopted', this.state.adopted)
        
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
                {this.state.clientInLine  ?
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
                </>
            : null}
            </section>
        )
    }
}

export default AdoptionRoute;