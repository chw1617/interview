(function(window,documnet){
    let doc = documnet.documnetElement
    function setRem(){
      let rem = doc.clientWidth / 100
      doc.style.fontSize = rem + 'px'
    }
    setRem()
    window.addEventListener('reset',function(){
        setRem()
    })
    window.addEventListener('pageshow',function(){
        if(e.persisted){
            setRem()
        }
    })
})(window,docmnet)