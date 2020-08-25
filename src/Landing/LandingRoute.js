import React from 'react';
import {Link} from 'react-router-dom';

function LandingRoute() {
    return ( 
      <section className="landing">
        <h1>Petful</h1>
        <img></img>
        {/* ^^^ choose and download image to include for page */}
        <Link to="/adoption"><button type="button" className="medium-btn">Adopt A Pet</button></Link>
        {/* Button to start adoption here */}
        <h2>Adopt A Furry Freind</h2>
        <p>Petful is an online adoption agency for cat and dog like creatures. We believe in quality over quantity and thus choose offer a very limited amount of 'cats' and 'dogs' to our clients.</p>
        <h3>How Our Adoption Process Works</h3>
        <p>Once you've added your name to our list, we will show you the cat and dog currently up for adoption as well as the other clients in line. Once it is your turn, you are given a short time to select a cat or dog to adopt. Choose quickly! If you miss your turn you will need to try again at a later time.</p>
      </section>
    )
}

export default LandingRoute;