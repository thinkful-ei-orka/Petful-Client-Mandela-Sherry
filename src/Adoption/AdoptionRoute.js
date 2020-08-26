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
            randomClients: [
                1,2,3,4,5
            ]
        }
    }
    
    componentDidMount() {
        //get all in line
        this.getLineQueue();
    }

    handleNameSubmit = (e) => {
        e.preventDefault();
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
        // .then(() => this.adoptionTimer = setInterval(this.adopt, 6000))
        .catch(e => console.log('error:',e));
    };

    getLineQueue = () => {
        console.log('getLineQ')
        fetch(`${config.API_ENDPOINT}/people`)
        .then(res => res.json())
        .then(lineData => {
        // set position of client needed?
            console.log('lineData on line 56', lineData)
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
            // set position of client needed?
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
        // if (this.lineQueue[0] == this.state.clientName)
        if (this.state.clientInLine) {
            console.log('this.state.lineQueue[0] on line 82', this.state.lineQueue[0])
            if (this.state.clientName === this.state.lineQueue[1]) {
                console.log('got into the if on line 93 so cTTS is true now?')
                this.setState({
                    clientTurnToSelect: true
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
                )
                .catch(e => console.log('error:', e));
            }
            //timer start for adding clients
            //have them select pet
            // then delete them
            // then delete pet
            // fetch(`${config.API_ENDPOINT}/people`, {
            //     method: 'DELETE'
            // })
            //     .catch(e => console.log('error:', e));
        }
        this.getLineQueue();
        this.getNextCatDog();
    };

    stopAdoptions = () => {
        console.log('time to stop the line')
        clearInterval(this.adopt);
    }

    addClient = () => {
        //add a client once every 5 seconds
        //while lineQueue.length !== 5
        //New Client => randomClients.pop()
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

    render() {
        console.log('clientTurnToSelect', this.state.clientTurnToSelect)
        console.log('clientInLine', this.state.clientInLine)
        console.log('clinetName', this.state.clientName)
        console.log('line 158 lineQueue', this.state.lineQueue)
        if (this.state.lineQueue.length <= 1) {
            console.log('into the if')
            clearInterval(this.adoptionTimer)
        }
        // if (this.state.lineQueue.length === 0 || this.state.currentCat === null || this.state.currentDog) {
        //     this.stopAdoptions()
        // }

        // if (this.state.clientTurnToSelect === true) {
        //     console.log('into the else if statement')
        //     // this.stopAdoptions();
        //     clearInterval(this.adopt);
        // }
        
        return(
            <section className="adoption">
                <h1>Petful</h1>
                <form className='add-name-form' onSubmit={this.handleNameSubmit}>
                    <label htmlFor="client-name">Enter Your Name</label>    
                    <input type="text" onChange={this.setName} id="client-name"className="client-name-field"></input>
                    <button type="submit" className="add-name-button small-btn">Jump In Line</button>
                </form>
                {this.state.clientInLine ?
                    <>
                    <div className="client-line">
                    <ol>
                        {this.renderLine()}
                    </ol>
                    </div>
                    <div className="pet-selection">
                        <div className="cat-info container">
                            {this.state.clientTurnToSelect && <button className='adopt-button' type='button'>Adopt {this.state.currentCat.name}!</button>}
                            <img className='animal-image' src={this.state.currentCat.imageURL} alt={this.state.currentCat.description}></ img>
                            <p className='pet-info'>My Name: {this.state.currentCat.name}</p>
                            <p className='pet-info'>Description: {this.state.currentCat.description}</p>
                            <p className='pet-info'>Breed: {this.state.currentCat.breed}</p>
                            <p className='pet-info'>Gender: {this.state.currentCat.gender}</p>
                            <p className='pet-info'>Age: {this.state.currentCat.age}</p>
                            <p className='pet-info'>My Story: {this.state.currentCat.story}</p>
                        </div>
                        <div className="dog-info container">
                            {this.state.clientTurnToSelect && <button className='adopt-button' type='button'>Adopt {this.state.currentDog.name}!</button>}
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