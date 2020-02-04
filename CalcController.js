class CalcController{//classe

    constructor(){

        this._lastOperator = '';
        this._lastNumber= '';
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl= document. querySelector("#display");
        this._dateEl=document. querySelector("#data");
        this._timeEl=document. querySelector("#hora");
        this._displayCalc="0"; //privado pq tem anderline
        this._currentDate;//privado pq tem anderline
        this.initButtonEvents();
        this.initialize();
    }

    initialize(){
        this.setDisplayDateTime();
    
        setInterval(()=>{ //função que determina o espaço de um tempo
            this.setDisplayDateTime();

        }, 1000 );//atualiza a cada milisegundo
        this.setLastNumberToDisplay();

    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event =>{
            element.addEventListener(event, fn, false);
        });

    }

        clearAll(){//limpa tudo
            this._operation = [];
            this._lastNumber='';
            this._lastOperator='';
            this.setLastNumberToDisplay();


        }

        clearEntry(){
            this._operation.pop();
            this.setLastNumberToDisplay();
        }

        setError(){

            this.displayCalc = "Error";
        }

        getLastOperation(){

           return  this._operation[this._operation.length-1];

        }

        setLastOperation(value){
            this._operation[this._operation.length - 1]= value;

        }
        isOperator(value){
            return (['+', '-', '*', '%', '/'].indexOf(value)> -1);
            
            }
        pushOperation(value){
            this._operation.push(value)
            if (this._operation.length>3){
                
                this.calc();

            }
        }
        getResult(){
            return eval (this._operation.join(""));

        }
        calc(){

            let last= "";

            this._lastOperator = this.getLastItem();

            if(this._operation.length<3){
                let firtsItem= this._operation[0];
                this._operation=[firtsItem, this._lastOperator, this._lastNumber];
            }

            if(this._operation.length>3){
                last= this._operation.pop();
                this._lastNumber = this.getResult();
            }else if(this._operation.length==3){
                
                this._lastNumber = this.getResult(false); 
            }
           
          let result = this.getResult();

            if (last == "%"){
              result /= 100;
              this._operation=[result];

            }else{
                
                this._operation = [result];
                if(last) this._operation.push(last);
            }
          
          this.setLastNumberToDisplay();

        }
        getLastItem(isOperator = true){
            let lastItem;

            for(let i= this._operation.length-1; i>= 0; i-- ){
         
                if(this.isOperator(this._operation[i])== isOperator){
                    lastItem=this._operation[i];
                    break;//para a execução do for
                }
                
            }
            if(!last){

                lastItem=(isOperator)? this._lastOperator: this._lastNumber;
            }
            return lastItem;

        }
    

        setLastNumberToDisplay(){

          let lastNumnber= this.getLastItem(false);
          
            if(!lastNumnber) lastNumnber = 0;
            this.displayCalc = lastNumnber;
        }
        addOperation(value){

               // console.log('A', value, isNaN(this.getLastOperation()));
            if (isNaN(this.getLastOperation())){
                //String
                if(this.isOperator(value)){//troca operador
                    this.setLastOperation(value);
                
                

                }else{
                    this.pushOperation(value)
                    this.setLastNumberToDisplay();
                }
            }else{
                if(this.isOperator(value)){
                    this.pushOperation(value)
                }else{

                 let newvalue = this.getLastOperation().toString()+ value.toString();
                this.setLastOperation(parseFloat(newvalue));

                this.setLastNumberToDisplay();

                }

            }
 
        }

        addDot(){
            let lastOperation = this.getLastOperation();
            if(this.isOperator(lastOperation)|| !lastOperation){
                this.pushOperation('0.');
            }else{
                this.setLastOperation(lastOperation.toString()+'.');
            }
            this.setLastNumberToDisplay();

        }



        execBtn(value){

            switch (value){
                case 'ac':
                    this.clearAll();
                break;

                case 'ce':
                    this.clearEntry();
                break;

                case'soma':
                    this.addOperation('+');
                break;
                
                case'subtracao':
                this.addOperation('-');

                break;

                case'divisao':
                this.addOperation('/');

                break;

                case'multiplicacao':
                this.addOperation('*');

                break;

                case'porcento':
                this.addOperation('%');

                break;

                case'igual':
                this.calc();

                break;

                case 'ponto':
                    this.addDot();

                break;
                
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseFloat(value));
                break;

                default:
                    this.setError();
                break;


            }
        }

    initButtonEvents(){
    let buttons=document.querySelectorAll("#buttons>g, #parts>g");
    //vai pegar o primeiro elemento da pesquisa

    buttons.forEach((btn, index)=>{
        this.addEventListenerAll(btn, 'click drag', e=>{
            let textBtn = btn.className.baseVal.replace("btn-", "");
            //let textBtn = console.log(btn.className.baseVal.replace("btn-"," "));

            this.execBtn(textBtn);//executa a ação
        });
        this.addEventListenerAll(btn, "mouseover mouseup mousedow", e =>{//faz colocar a mão no lugir da flexa
            btn.style.cursor = "pointer";
        })
    });
}
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day:"2-digit",
           month:"long",
           year:"numeric"});
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
        return this._timeEl.innerHTML=value;
    }
    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayDate(value){
        return this._dateEl.innerHTML=value;
    }
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        this._displayCalcEl.innerHTML= value;

    }
    get currentDate(){
        return new Date();
    }
    set dataAtual(value){
        this._dataAtual=value;
    }

}