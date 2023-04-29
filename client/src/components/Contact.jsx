import React from 'react';
import styled from 'styled-components';

const Contact = () => {
    const Wrapper = styled.section`
    .container {
        text-align: left;

        .contact-form{
            max-width: 30rem;
            margin-left: 65%;
            margin-top: -48%;
        }

        .contact-inputs{
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
        }
    }
    `;
  return (
    <Wrapper className='section'>
        <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d863.8810157624372!2d75.40013562915712!3d29.993105060380522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39111ecfc210dbc3%3A0x754fea64a209c1e3!2sKhalsa%2C%20Mansa%2C%20Punjab%20151505!5e0!3m2!1sen!2sin!4v1666006423404!5m2!1sen!2sin" 
        width="60%" 
        height="550" 
        style={{border:0}}
        allowFullScreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"></iframe>

        <div className="container">
            <div className="contact-form">
                <form action='#' className='contact-inputs'>
                    <h1>CONTACT US</h1>
                    <div className="inputBox">
                        <h5>Enter Username</h5>
                        <input type="text" name="username" placeholder="Enter Username" required/>
                    </div>
                    
                    <div className="inputBox">
                        <h5>Enter Email</h5>
                        <input type="email" name="email" placeholder="Enter Email" required/>
                    </div>

                    <div className="inputBox">
                    <h5>Enter Message</h5>
                        <textarea name='message' placeholder="Enter Message" required/>
                    </div>
                    
                    <div className="inputBox">
                        <input className='btn btn-primary' type="submit" />
                    </div>
                </form>
            </div>
        </div>
    </Wrapper>
  )
}
export default Contact;