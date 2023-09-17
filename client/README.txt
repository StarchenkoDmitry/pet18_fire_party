Name Project: telegramer

48px;  8 margine 







overflow: auto;
  // overflow: scroll;

  overflow-x: hidden;
  overflow-y: auto;
  over: 0;  
  // scrollbar-width: thin;          /* "auto" or "thin" */
  scrollbar-color: blue orange; 


::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: red; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}