// async function func1(){
// 	const list = document.querySelectorAll(".oZ-x3");
//     list.forEach(e=>{e.click();})


//     const btndel = document.querySelector(".T-I");
//     btndel.click();

//     const btndel = document.querySelector(".ar9");
//     btndel.click();
    
//     setTimeout(func1,5000);
// }

// func1();



async function func1(){
	const list = document.querySelectorAll(".oZ-x3");
    list.forEach(e=>{e.click();})

    
    setTimeout(func1,1000);
}

func1();


// const f = document.querySelectorAll(".T-I");
// f.forEach(e=>{
//     const at = e.attributes['aria-label'];
//     console.log(at);
// });

// data-tooltip

// const f = document.querySelectorAll(".T-I");
// f.forEach(e=>{
//     const at = e.attributes['data-tooltip'];
//     console.log(at);
// }); 


// const f = document.querySelector(".nX").childNodes[0]
// f.forEach(e=>{
//     // const at = e.attributes['data-tooltip'];
//     console.log(e);
//     e.click();
// }); 



const f = document.querySelectorAll("div").forEach(e=>{
    e.addEventListener("click",  function(e){ 
        // this.style.backgroundColor = "red";
        console.log("myClick: ",e);
    });
});





function simulate(element, eventName)
{
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}

simulate(document.querySelector(".nX"),"click");


document.querySelector(".nX")


document.getElementById('testTarget')
  .dispatchEvent(new MouseEvent('click', {shiftKey: true}))



const f = document.querySelectorAll("div").forEach(e=>{
    e.addEventListener("click",  function(e){ 
        // this.style.backgroundColor = "red";
        console.log("myClick: ",this);
    });
});




pointerType
: 
"mouse"

type
: 
"click"
isTrusted
: 
true
altKey
: 
false
altitudeAngle
: 
1.5707963267948966
azimuthAngle
: 
0
bubbles
: 
true
button
: 
0
buttons
: 
0
cancelBubble
: 
false
cancelable
: 
true
clientX
: 
426
clientY
: 
84
composed true



  document.querySelector(".nX").dispatchEvent(new PointerEvent("click",{ bubbles: true,
    cancelable: true,
    composed: true,
    pointerId: 42,
    pointerType: "pen",
    clientX: 300,
    clientY: 500
  });

(()=>{


    // const evt = new PointerEvent('mouse',{ clientX: 610, clientY: 209, pointerType:"mouse"});
    // document.querySelector(".nX").dispatchEvent(evt);

    const evt = new PointerEvent('click',{
        pointerType:"mouse",
        bubbles:true,
        cancelable:true,
        composed:true,
        detail:1,
        pointerId:1,

    });

    document.querySelector(".nX").dispatchEvent(evt);

})();

(()=>{

    document.querySelector(".nX").addEventListener("mousedown",  function(e){ 
        // this.style.backgroundColor = "red";
        console.log("myClickup: ",e);
    });

})();









const f = document.querySelectorAll("div").forEach(e=>{
    e.addEventListener("click",  function(e){ 
        // this.style.backgroundColor = "red";
        console.log("myClick: ",this);
    });
});

