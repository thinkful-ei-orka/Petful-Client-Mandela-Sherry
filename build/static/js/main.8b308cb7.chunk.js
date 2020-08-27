(this["webpackJsonppetful-client"]=this["webpackJsonppetful-client"]||[]).push([[0],{22:function(e,t,n){e.exports=n(35)},23:function(e,t,n){},28:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);n(23);var a=n(0),o=n.n(a),c=n(14),r=n.n(c),i=n(8),l=n(5);n(28);var s=function(){return o.a.createElement("section",{className:"landing"},o.a.createElement("h1",null,"Petful"),o.a.createElement(i.b,{to:"/adoption"},o.a.createElement("button",{type:"button",className:"medium-btn"},"Adopt A Pet")),o.a.createElement("h2",null,"Adopt A Furry Freind"),o.a.createElement("p",null,"Petful is an online adoption agency for cat and dog like creatures. We believe in quality over quantity and thus choose offer a very limited amount of 'cats' and 'dogs' to our clients."),o.a.createElement("h3",null,"How Our Adoption Process Works"),o.a.createElement("p",null,"Once you've added your name to our list, we will show you the cat and dog currently up for adoption as well as the other clients in line. Once it is your turn, you are given a short time to select a cat or dog to adopt. Choose quickly! If you miss your turn you will need to try again at a later time."))},u=n(17),m=n(18),d=n(20),p=n(19),h=n(21),f={REACT_APP_API_BASE:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_API_ENDPOINT},E=(n(34),function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).handleNameSubmit=function(e){e.preventDefault(),n.setState({adopted:"",addingClients:!1}),n.adoptionTimer=setInterval(n.adopt,5e3);var t=n.state.clientName;fetch("".concat(f.REACT_APP_API_ENDPOINT,"/people"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({personName:t})}).then((function(e){n.getLineQueue(),n.getNextCatDog()})).then(n.setState({clientInLine:!0})).catch((function(e){return console.log("error:",e)}))},n.handleAdoptMeClick=function(e){e.preventDefault();var t=e.target.value;"cat"===t?n.setState({clientSelection:n.state.currentCat}):"dog"===t&&n.setState({clientSelection:n.state.currentDog}),fetch("".concat(f.REACT_APP_API_ENDPOINT,"/pets"),{method:"DELETE",headers:{"content-type":"application/json"},body:JSON.stringify({petType:t})}).catch((function(e){return console.log("error:",e)})),fetch("".concat(f.REACT_APP_API_ENDPOINT,"/people"),{method:"DELETE"}).then((function(){return n.setState({clientTurnToSelect:!1})})).catch((function(e){return console.log("error:",e)}))},n.getLineQueue=function(){fetch("".concat(f.REACT_APP_API_ENDPOINT,"/people")).then((function(e){return e.json()})).then((function(e){return n.setState({lineQueue:e})})).then((function(){if(n.state.lineQueue[0]===n.state.clientName)return n.setState({clientTurnToSelect:!0})})).catch((function(e){return console.log("error:",e)}))},n.getNextCatDog=function(){fetch("".concat(f.REACT_APP_API_ENDPOINT,"/pets")).then((function(e){return e.json()})).then((function(e){n.setState({currentCat:e[0],currentDog:e[1]})})).catch((function(e){return console.log("error:",e)}))},n.getCurrentCatDog=function(){fetch("".concat(f.REACT_APP_API_ENDPOINT,"/api/cat")).then((function(e){return e.json()})).then((function(e){n.setState({currentCat:e})})).catch((function(e){return console.log("error:",e)})),fetch("".concat(f.REACT_APP_API_ENDPOINT,"/api/dog")).then((function(e){return e.json()})).then((function(e){n.setState({currentDog:e})})).catch((function(e){return console.log("error:",e)}))},n.adopt=function(){if(n.state.clientInLine){var e=n.state.clientName;if(0===n.state.lineQueue.filter((function(t){return t===e})).length)return clearInterval(n.adoptionTimer),n.setState({clientInLine:!1,clientTurnToSelect:!1});if(!n.state.clientTurnToSelect){var t=Math.floor(2*Math.random());t=0===t?"cat":"dog",fetch("".concat(f.REACT_APP_API_ENDPOINT,"/pets"),{method:"DELETE",headers:{"content-type":"application/json"},body:JSON.stringify({petType:t})}).then((function(e){return e.ok?fetch("".concat(f.REACT_APP_API_ENDPOINT,"/people"),{method:"DELETE"}):e.json().then((function(e){return Promise.reject(e)}))})).catch((function(e){return console.log("error:",e)}))}}n.getLineQueue(),n.getNextCatDog()},n.stopAdoptions=function(){clearInterval(n.adopt)},n.addClient=function(){var e="TestClient".concat(Math.floor(88*Math.random()));fetch("".concat(f.REACT_APP_API_ENDPOINT,"/people"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({personName:e})}).then((function(e){n.getLineQueue()})).catch((function(e){return console.log("error:",e)}))},n.onAdoptClick=function(e,t){clearInterval(n.adoptionTimer),fetch("".concat(f.REACT_APP_API_ENDPOINT,"/pets"),{method:"DELETE",headers:{"content-type":"application/json"},body:JSON.stringify({petType:t})}).then((function(){n.setState({clientName:"",clientTurnToSelect:!1,clientInLine:!1,adopted:e.name})})).then((function(){n.getLineQueue(),n.getNextCatDog()})).catch((function(e){return console.log("error:",e)}))},n.renderLine=function(){var e=[];return n.state.lineQueue.map((function(t){e.push(o.a.createElement("li",{key:t},t))})),e},n.setName=function(e){n.setState({clientName:e.target.value})},n.setAddingClients=function(){n.setState({addingClients:!n.state.addingClients})},n.state={clientName:"",clientInLine:!1,clientTurnToSelect:!1,clientSelection:{},lineQueue:[],currentCat:{},currentDog:{},adopted:"",addingClients:!1},n}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.getLineQueue(),this.setState({addingCients:!1})}},{key:"render",value:function(){var e=this;return 2===this.state.lineQueue.length&&!1===this.state.addingClients&&(this.setAddingClients(),this.clientTimer=setInterval(this.addClient,5e3)),this.state.lineQueue.length>=5&&(this.state.adopted.length>0||!this.state.clientInLine)&&clearInterval(this.clientTimer),o.a.createElement("section",{className:"adoption"},o.a.createElement("h1",null,"Petful"),o.a.createElement("form",{className:"add-name-form",onSubmit:this.handleNameSubmit},o.a.createElement("label",{htmlFor:"client-name"},"Enter Your Name"),o.a.createElement("input",{type:"text",onChange:this.setName,id:"client-name",className:"client-name-field",required:!0}),o.a.createElement("button",{type:"submit",className:"add-name-button small-btn"},"Jump In Line")),this.state.lineQueue&&o.a.createElement("div",{className:"client-line"},o.a.createElement("ol",null,this.renderLine())),this.state.adopted.length>0&&o.a.createElement("p",{className:"adopted"},"Congrats! You adopted ",this.state.adopted,"!"),this.state.clientInLine||this.state.adopted.length>0?o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"pet-selection"},o.a.createElement("div",{className:"cat-info container"},this.state.clientTurnToSelect&&o.a.createElement("button",{className:"adopt-button",type:"button",onClick:function(){return e.onAdoptClick(e.state.currentCat,"cat")}},"Adopt ",this.state.currentCat.name,"!"),o.a.createElement("img",{className:"animal-image",src:this.state.currentCat.imageURL,alt:this.state.currentCat.description}),o.a.createElement("p",{className:"pet-info"},"My Name: ",this.state.currentCat.name),o.a.createElement("p",{className:"pet-info"},"Description: ",this.state.currentCat.description),o.a.createElement("p",{className:"pet-info"},"Breed: ",this.state.currentCat.breed),o.a.createElement("p",{className:"pet-info"},"Gender: ",this.state.currentCat.gender),o.a.createElement("p",{className:"pet-info"},"Age: ",this.state.currentCat.age),o.a.createElement("p",{className:"pet-info"},"My Story: ",this.state.currentCat.story)),o.a.createElement("div",{className:"dog-info container"},this.state.clientTurnToSelect&&o.a.createElement("button",{className:"adopt-button",type:"button",onClick:function(){return e.onAdoptClick(e.state.currentDog,"dog")}},"Adopt ",this.state.currentDog.name,"!"),o.a.createElement("img",{className:"animal-image",src:this.state.currentDog.imageURL,alt:this.state.currentDog.description}),o.a.createElement("p",{className:"pet-info"},"My Name: ",this.state.currentDog.name),o.a.createElement("p",{className:"pet-info"},"Description: ",this.state.currentDog.description),o.a.createElement("p",{className:"pet-info"},"Breed: ",this.state.currentDog.breed),o.a.createElement("p",{className:"pet-info"},"Gender: ",this.state.currentDog.gender),o.a.createElement("p",{className:"pet-info"},"Age: ",this.state.currentDog.age),o.a.createElement("p",{className:"pet-info"},"My Story: ",this.state.currentDog.story)))):null)}}]),t}(a.Component));var g=function(){return o.a.createElement("main",{className:"app"},o.a.createElement(i.a,null,o.a.createElement(l.a,{path:"/",exact:!0,component:s}),o.a.createElement(l.a,{path:"/adoption",component:E})))};r.a.render(o.a.createElement(g,null),document.getElementById("root"))}},[[22,1,2]]]);
//# sourceMappingURL=main.8b308cb7.chunk.js.map