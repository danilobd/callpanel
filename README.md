# Callpanel

A users password panel to desk services

![sceen-panel](https://user-images.githubusercontent.com/16763395/53369197-6efc9480-3929-11e9-8ea8-c9d95d9e3ed4.png)

![desk-panel](https://user-images.githubusercontent.com/16763395/53369309-b1be6c80-3929-11e9-9292-24c0e9f83d36.png)

## Getting Start

### Instaling

Clone this repository and install the dependencies

    npm install
Or
    
    yarn install

Change the parameters of configuration to your Ip address if you run outside of localhost

    public/desk/index.html
    public/panel/index.html
    
                        IP        PORT  SEGURE              KEY
    CallPanel.conect('localhost', 5001, false, "5asd64sad56a4sd5as4d564e5g4t6h54t");

### Run

    node server.js
    
 Access the panel in the browser
  
    public/panel/index.html
  
 And the desk service on
 
    public/panel/index.html
