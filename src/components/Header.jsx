import React from "react";

function Header(){
    return(
        <div className="Navbar">
            <h1 className="navbarLogo">This is a Header</h1>
            <ul className="navbarLinks">
                <li>Home</li>
                <li>Completed Notes</li>
            </ul>
        </div>
    )
}

export default Header;